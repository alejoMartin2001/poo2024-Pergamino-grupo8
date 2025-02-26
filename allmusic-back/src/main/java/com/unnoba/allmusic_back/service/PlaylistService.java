package com.unnoba.allmusic_back.service;

import com.unnoba.allmusic_back.dto.*;
import com.unnoba.allmusic_back.entity.Playlist;
import com.unnoba.allmusic_back.entity.Song;
import com.unnoba.allmusic_back.entity.User;
import com.unnoba.allmusic_back.repository.PlaylistRepository;
import com.unnoba.allmusic_back.repository.SongRepository;
import com.unnoba.allmusic_back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

    /**
     * Crea una playlist vacía.
     * @param playlistRequestDto son los datos para crear una playlist vacía.
     * @param username es el nombre de usuario.
     */
    @Transactional
    public void createPlaylist(PlaylistRequestDto playlistRequestDto, String username) {
        Playlist playlist = this.mapToPlaylist(playlistRequestDto, username);

        try{
            this.playlistRepository.save(playlist);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al crear el playlist");
        }
    }

    /**
     * Agrega una canción a la playlist del propietario autenticado. La canción tiene que existir.
     * @param songToPlaylistRequestDto son los datos de la canción ya existente.
     * @param username es el nombre de usuario.
     */
    @Transactional
    public void addSongsToPlaylist(SongToPlaylistDto songToPlaylistRequestDto, String username) {
//        User user = userRepository.findByUsername(username).orElseThrow(
//                () -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "El usuario no existe")
//        );
//
//        Playlist playlist = playlistRepository.findByTitleAndOwner(
//                songToPlaylistRequestDto.getPlaylistTitle(), user).orElseThrow(
//                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "La playlist no existe")
//        );

        Playlist playlist = this.findPlaylistByUserAndTitle(username, songToPlaylistRequestDto.getPlaylistTitle());

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

    /**
     * Devuelve todas las playlists de un usuario.
     * @param username es el nombre de usuario cuyas playlists queremos.
     * @return retorna todas sus playlists.
     */
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

    /**
     * Cambia la visibilidad de la playlist.
     * @param title es el titulo de la playlist
     * @param username es el nombre de usuario del usuario propietario de la playlist.
     */
    public void isPrivatePlaylist(String title, String username){
//        User user = userRepository.findByUsername(username).orElseThrow(
//                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no existe")
//        );
//
//        Playlist playlist = playlistRepository.findByTitleAndOwner(title, user).orElseThrow(
//                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "La playlist no existe")
//        );
        Playlist playlist = this.findPlaylistByUserAndTitle(username, title);

        try{
            boolean isPrivate = playlist.isPrivate();
            playlist.setPrivate(!isPrivate);
            playlistRepository.save(playlist);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error");
        }
    }

    /**
     * Actualiza el título, descripción y (Muy Pronto) la portada de la playlist.
     * @param playlistUpdateDto es la información a actualizar en la playlist.
     * @param username es el nombre de usuario del propietario de la playlist.
     * @param title es el título de la playlist que se va a actualizar.
     */
    public void updatePlaylist(PlaylistUpdateDto playlistUpdateDto, String username, String title) {
//        User user = userRepository.findByUsername(username).orElseThrow(
//                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no existe")
//        );

//        Playlist playlist = playlistRepository.findByTitleAndOwner(title, user).orElseThrow(
//                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "La playlist no existe")
//        );

        Playlist playlist = this.findPlaylistByUserAndTitle(username, title);

        try{
            if (playlistUpdateDto.getTitle() != null){
                playlist.setTitle(playlistUpdateDto.getTitle());
            }
            if (playlistUpdateDto.getDescription() != null){
                playlist.setDescription(playlistUpdateDto.getDescription());
            }
            playlistRepository.save(playlist);
        }catch(Exception e){
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error al actualizar la playlist"
            );
        }
    }

    /**
     * Elimina la playlist del usuario autenticado.
     * @param title es el nombre de la playlist.
     * @param username es el nombre de usuario del propietario de la playlist.
     */
    @Transactional
    public void deletePlaylist(String title, String username) {
//        User user = userRepository.findByUsername(username).orElseThrow(
//                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no existe")
//        );
//
//        Playlist playlist = playlistRepository.findByTitleAndOwner(title, user).orElseThrow(
//                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "La playlist no existe")
//        );

        Playlist playlist = this.findPlaylistByUserAndTitle(username, title);

        try {
            playlistRepository.delete(playlist);
        }catch (Exception e){
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error al eliminar la playlist"
            );
        }
    }

    /**
     * Elimina una canción en la playlist.
     * @param username es el nombre de usuario del propietario de la playlist.
     * @param playlistDeleteSongDto contiene los datos de la canción a eliminar.
     */
    public void deleteSongByPlaylist(String username, SongToPlaylistDto playlistDeleteSongDto) {
        Playlist playlist = this.findPlaylistByUserAndTitle(username, playlistDeleteSongDto.getPlaylistTitle());

        Song song = songRepository.findByTitleAndAlbumTitle(
                playlistDeleteSongDto.getSongTitle(), playlistDeleteSongDto.getAlbumTitle()).orElseThrow(
                        () -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND, "La canción no existe"
                        )
        );

        if (!playlist.getSongs().contains(song))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "La canción no existe en la playlist");

        try{
            playlist.getSongs().remove(song);
            playlistRepository.save(playlist);
        }catch (Exception e){
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error al eliminar la canción en la playlist"
            );
        }
    }

//    Métodos privados.
    private Playlist findPlaylistByUserAndTitle(String username, String title) {
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no existe")
        );

        return playlistRepository.findByTitleAndOwner(title, user).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "La playlist no existe")
        );
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
                .genre(song.getGenre())
                .build();
    }

}
