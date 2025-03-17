package com.unnoba.allmusic_back.service;

import com.unnoba.allmusic_back.dto.album.AlbumDto;
import com.unnoba.allmusic_back.dto.album.AlbumRequestDto;
import com.unnoba.allmusic_back.dto.album.AlbumResponseDto;
import com.unnoba.allmusic_back.dto.playlist.SectionDto;
import com.unnoba.allmusic_back.dto.song.SongRequestDto;
import com.unnoba.allmusic_back.entity.*;
import com.unnoba.allmusic_back.repository.AlbumRepository;
import com.unnoba.allmusic_back.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AlbumService {

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private ArtistRepository artistRepository;

    @Autowired
    private S3Service s3Service;

    /**
     * Crea un álbum vacío.
     * @param albumDto son los datos del álbum a crear.
     * @param username es el nombre de usuario del artista.
     */
    public void createAlbum(Album albumDto, String username, MultipartFile image) {
        MusicArtiesUser musicArtiesUser = artistRepository.findByUsername(username).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El artista no existe")
        );

        try{
            String fileProfile;
            if (image == null || image.isEmpty()) {
                fileProfile = "https://allmusicstorage.s3.sa-east-1.amazonaws.com/albums/playlist-default.png";
            } else {
                fileProfile = s3Service.uploadFile("albums/", image );
            }
            albumDto.setAuthor(musicArtiesUser);
            albumDto.setImageUrl(fileProfile);
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
    public List<SectionDto> getAllAlbumsByMe(String username){
        List<Album> albums = albumRepository.findAlbumByAuthorUsername(username);

        try{
            return albums.stream().map(this::mapToSectionDto).collect(Collectors.toList());
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener el album");
        }
    }

    public AlbumResponseDto getAlbumById(Long albumId) {
        Album album = albumRepository.findById(albumId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El album no existe")
        );
        try {
            return this.getAlbumResponseDto(album);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener el album");
        }
    }

    /**
     * Devuelve TODOS los álbumes registrados.
     * @return retorna todos los álbumes.
     */
    public List<SectionDto> getAllAlbums(){
        List<Album> albums = albumRepository.findAll();

        try {
            return albums.stream().map(this::mapToSectionDto).collect(Collectors.toList());
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener los álbumes");
        }
    }

    /**
     * Actualiza el nombre, imagen y fecha de lanzamiento de un álbum.
     * @param albumRequestDto son los datos actualizados del álbum a actualizar.
     * @param albumId es el ID del álbum.
     */
//    public void updateAlbum(AlbumRequestDto albumRequestDto, Long albumId) {
//        Album album = albumRepository.findById(albumId).orElseThrow(
//                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El album no existe")
//        );
//
//        try {
//            if (albumRequestDto.getAlbumName() != null) {
//                album.setTitle(albumRequestDto.getAlbumName());
//            }
//            if (albumRequestDto.getImageUrl() != null) {
//                album.setImageUrl(albumRequestDto.getImageUrl());
//            }
//            if (albumRequestDto.getReleaseDate() != null){
//                album.setReleaseDate(albumRequestDto.getReleaseDate());
//            }
//            albumRepository.save(album);
//        }catch (Exception e){
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al actualizar el album");
//        }
//    }

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

    private String getAlbumType(Album album){
        String typeAlbum;
//        ¡Mala práctica! :(
        if (album instanceof AlbumExtendedPlay) {
            typeAlbum = "EP";
        } else if (album instanceof AlbumLongPlay) {
            typeAlbum = "Álbum";
        } else {
            typeAlbum = "Sencillo";
        }
        return typeAlbum;
    }


    private SectionDto mapToSectionDto(Album album) {
        String typeAlbum = this.getAlbumType(album);

        return SectionDto.builder()
                .sectionId(album.getId_album())
                .sectionName(album.getTitle())
                .ownerName(album.getAuthor().getArtistName())
                .ownerUsername(album.getAuthor().getUsername())
                .imageUrl(album.getImageUrl())
                .type(typeAlbum)
                .build();
    }

    private AlbumResponseDto getAlbumResponseDto(Album album){
        String typeAlbum = this.getAlbumType(album);

        AlbumResponseDto albumDto = new AlbumResponseDto();
        albumDto.setAlbumId(album.getId_album());
        albumDto.setAlbumTitle(album.getTitle());
        albumDto.setImageUrl(album.getImageUrl());
        albumDto.setArtistName(album.getAuthor().getArtistName());
        albumDto.setArtistUsername(album.getAuthor().getUsername());
        albumDto.setReleaseDate(album.getReleaseDate());
        albumDto.setType(typeAlbum);
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
