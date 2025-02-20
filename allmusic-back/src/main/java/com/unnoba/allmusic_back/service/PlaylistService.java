package com.unnoba.allmusic_back.service;

import com.unnoba.allmusic_back.dto.PlaylistRequestDto;
import com.unnoba.allmusic_back.dto.PlaylistResponseDto;
import com.unnoba.allmusic_back.dto.SongResponseDto;
import com.unnoba.allmusic_back.dto.SongToPlaylistRequestDto;
import com.unnoba.allmusic_back.entity.Playlist;
import com.unnoba.allmusic_back.entity.Song;
import com.unnoba.allmusic_back.entity.User;
import com.unnoba.allmusic_back.repository.PlaylistRepository;
import com.unnoba.allmusic_back.repository.SongRepository;
import com.unnoba.allmusic_back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SongRepository songRepository;

    public void createPlaylist(PlaylistRequestDto playlistRequestDto, String username) {
        Playlist playlist = this.mapToPlaylist(playlistRequestDto, username);

        try{
            this.playlistRepository.save(playlist);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al crear el playlist");
        }
    }

    // Falta el Controller y probarlo.
    public void addSongsToPlaylist(SongToPlaylistRequestDto songToPlaylistRequestDto, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "El usuario no existe")
        );

        Playlist playlist = playlistRepository.findByTitleAndOwner(
                songToPlaylistRequestDto.getPlaylistTitle(), user).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "La playlist no existe")
        );

        Song song = songRepository.findByTitleAndAlbumTitle(
                songToPlaylistRequestDto.getSongTitle(), songToPlaylistRequestDto.getAlbumTitle()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "La canción no existe")
        );

        if (playlist.getSongs().contains(song))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "La canción ya existe en la playlist");

        try {
            playlist.getSongs().add(song);
            songRepository.save(song);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al agregar la canción");
        }
    }

    public List<PlaylistResponseDto> getAllPlaylistsByUsername(String username) {
        List<Playlist> playlist = playlistRepository.findPlaylistByOwnerUsername(username);

        try {
            return playlist.stream().map(this::mapToDto).collect(Collectors.toList());
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error al retornar la/s playlist/s"
            );
        }
    }

    private PlaylistResponseDto mapToDto(Playlist playlist) {
        return PlaylistResponseDto.builder()
                .title(playlist.getTitle())
                .description(playlist.getDescription())
                .username(playlist.getOwner().getUsername())
                .isPrivate(playlist.isPrivate())
                .imageUrl(playlist.getImageUrl())
                // TODO: Este método no funciona!
                .songs(playlist.getSongs().stream().map(this::mapToSongDto).collect(Collectors.toList()))
                .build();
    }

    private Playlist mapToPlaylist(PlaylistRequestDto playlistRequestDto, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado")
        );

        Playlist playlist = new Playlist();
        playlist.setTitle(playlistRequestDto.getTitle());
        playlist.setImageUrl(playlistRequestDto.getImageUrl());
        playlist.setDescription(playlistRequestDto.getDescription());
        playlist.setPrivate(playlistRequestDto.isPrivate());
        playlist.setOwner(user);

        user.getPlaylists().add(playlist);
        return playlist;
    }

    private SongResponseDto mapToSongDto(Song song) {
        return SongResponseDto.builder()
                .title(song.getTitle())
                .artist(song.getArtists().stream().map(User::getUsername).collect(Collectors.toList()))
                .duration(song.getDuration())
                .albumName(song.getAlbum().getTitle())
                .build();
    }

}
