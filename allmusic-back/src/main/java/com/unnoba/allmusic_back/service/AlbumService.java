package com.unnoba.allmusic_back.service;

import com.unnoba.allmusic_back.dto.AlbumResponseDto;
import com.unnoba.allmusic_back.dto.SongRequestDto;
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

    public List<AlbumResponseDto> getAllAlbumsByMe(String username){
        List<Album> albums = albumRepository.findAlbumByAuthorUsername(username);

        try{
            return albums.stream().map(this::getAlbumDto).collect(Collectors.toList());
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener el album");
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
