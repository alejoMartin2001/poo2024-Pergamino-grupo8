package com.unnoba.allmusic_back.service;

import com.unnoba.allmusic_back.dto.album.AlbumDto;
import com.unnoba.allmusic_back.dto.album.AlbumRequestDto;
import com.unnoba.allmusic_back.dto.album.AlbumResponseDto;
import com.unnoba.allmusic_back.dto.song.SongRequestDto;
import com.unnoba.allmusic_back.entity.Album;
import com.unnoba.allmusic_back.entity.MusicArtiesUser;
import com.unnoba.allmusic_back.entity.Song;
import com.unnoba.allmusic_back.repository.AlbumRepository;
import com.unnoba.allmusic_back.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AlbumService {

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private ArtistRepository artistRepository;

    /**
     * Crea un álbum vacío.
     * @param albumDto son los datos del álbum a crear.
     * @param username es el nombre de usuario del artista.
     */
    public void createAlbum(Album albumDto, String username) {
        MusicArtiesUser musicArtiesUser = artistRepository.findByUsername(username).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El artista no existe")
        );

        try{
            albumDto.setAuthor(musicArtiesUser);
            musicArtiesUser.getAlbums().add(albumDto);
            albumRepository.save(albumDto);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al crear el album");
        }
    }

    /**
     * Agrega una lista de canciones para un álbum.
     * @param songsRequestDto es la lista de canciones para el album.
     */
    public void addSongsByAlbum(List<SongRequestDto> songsRequestDto, Long albumId) {
        Album album = albumRepository.findById(albumId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El album no existe")
        );

        try {
            List<Song> songs = songsRequestDto.stream()
                    .map(r -> this.mapToSong(r, album))
                    .toList();
            album.getSongs().addAll(songs);
            albumRepository.save(album);
        }catch (Exception e){
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error al agregar canciones al album"
            );
        }
    }

    /**
     * Devuelve todos los álbumes de un artista mediante su nombre de usuario.
     * @param username es el nombre de usuario del artista.
     * @return retorna todos sus álbumes.
     */
    public List<AlbumResponseDto> getAllAlbumsByMe(String username){
        List<Album> albums = albumRepository.findAlbumByAuthorUsername(username);

        try{
            return albums.stream().map(this::getAlbumResponseDto).collect(Collectors.toList());
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener el album");
        }
    }

    /**
     * Devuelve TODOS los álbumes registrados.
     * @return retorna todos los álbumes.
     */
    public List<AlbumDto> getAllAlbums(){
        List<Album> albums = albumRepository.findAll();

        try {
            return albums.stream().map(this::mapToAlbumDto).collect(Collectors.toList());
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener los álbumes");
        }
    }

    /**
     * Actualiza el nombre, imagen y fecha de lanzamiento de un álbum.
     * @param albumRequestDto son los datos actualizados del álbum a actualizar.
     * @param albumId es el ID del álbum.
     */
    public void updateAlbum(AlbumRequestDto albumRequestDto, Long albumId) {
        Album album = albumRepository.findById(albumId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El album no existe")
        );

        try {
            if (albumRequestDto.getAlbumName() != null) {
                album.setTitle(albumRequestDto.getAlbumName());
            }
            if (albumRequestDto.getImageUrl() != null) {
                album.setImageUrl(albumRequestDto.getImageUrl());
            }
            if (albumRequestDto.getReleaseDate() != null){
                album.setReleaseDate(albumRequestDto.getReleaseDate());
            }
            albumRepository.save(album);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al actualizar el album");
        }
    }

    /**
     * Elimina un álbum
     * @param albumId es el ID del álbum.
     */
    public void deleteAlbum(Long albumId) {
        Album album = albumRepository.findById(albumId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El álbum no existe")
        );

        try {
            albumRepository.delete(album);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al eliminar el album");
        }
    }

    private AlbumDto mapToAlbumDto(Album album) {
        String nameArtist = album.getAuthor().getFirstName() + " " + album.getAuthor().getLastName();
        return AlbumDto.builder()
                .albumId(album.getId_album())
                .albumName(album.getTitle())
                .artistName(nameArtist)
                .artistUsername(album.getAuthor().getUsername())
                .build();
    }

    private AlbumResponseDto getAlbumResponseDto(Album album){
        AlbumResponseDto albumDto = new AlbumResponseDto();
        albumDto.setAlbumId(album.getId_album());
        albumDto.setAlbumName(album.getTitle());
        albumDto.setImageUrl(album.getImageUrl());
        albumDto.setArtistName(album.getAuthor().getUsername());
        albumDto.setReleaseDate(album.getReleaseDate());
        albumDto.setSongs( album.getSongs().stream().map(this::getSongDto).collect(Collectors.toList()));
        return albumDto;
    }

    private SongRequestDto getSongDto(Song song){
        SongRequestDto songDto = new SongRequestDto();
        songDto.setTitle(song.getTitle());
        songDto.setDuration(song.getDuration());
        songDto.setGenre(song.getGenre());
        return songDto;
    }

    private Song mapToSong(SongRequestDto songRequestDto, Album album){
        Song song = new Song();
        song.setTitle(songRequestDto.getTitle());
        song.setDuration(songRequestDto.getDuration());
        song.setGenre(songRequestDto.getGenre());
        song.setAlbum(album);
        song.getArtists().add(album.getAuthor());
        return song;
    }


}
