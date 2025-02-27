package com.unnoba.allmusic_back.service;

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
     * @param albumName es el nombre del álbum.
     * @param username es el nombre de usuario del artista.
     */
    public void addSongsByAlbum(List<SongRequestDto> songsRequestDto, String albumName, String username) {
        Album album = albumRepository.findAlbumByTitleAndArtist(albumName, username).orElseThrow(
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
            return albums.stream().map(this::getAlbumDto).collect(Collectors.toList());
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener el album");
        }
    }

    /**
     * Actualiza el nombre, imagen y fecha de lanzamiento de un álbum.
     * @param albumRequestDto son los datos actualizados del álbum a actualizar.
     * @param albumName es el nombre del álbum.
     * @param username es el nombre de usuario del artista.
     */
    public void updateAlbum(AlbumRequestDto albumRequestDto, String username, String albumName) {
        Album album = albumRepository.findAlbumByTitleAndArtist(albumName, username).orElseThrow(
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
     * @param albumName es el nombre del álbum.
     * @param username es el nombre de usuario del artista.
     */
    public void deleteAlbum(String albumName, String username) {
        Album album = albumRepository.findAlbumByTitleAndArtist(albumName, username).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El album no existe")
        );

        try {
            albumRepository.delete(album);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al eliminar el album");
        }
    }

    private AlbumResponseDto getAlbumDto(Album album){
        AlbumResponseDto albumDto = new AlbumResponseDto();
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
