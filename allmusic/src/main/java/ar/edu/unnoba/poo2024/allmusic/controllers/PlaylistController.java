package ar.edu.unnoba.poo2024.allmusic.controllers;

import ar.edu.unnoba.poo2024.allmusic.dto.PlaylistCreateUpdateDTO;
import ar.edu.unnoba.poo2024.allmusic.dto.PlaylistResponseDTO;
import ar.edu.unnoba.poo2024.allmusic.dto.SongCreateUpdateDTO;
import ar.edu.unnoba.poo2024.allmusic.entities.Playlist;
import ar.edu.unnoba.poo2024.allmusic.entities.Song;
import ar.edu.unnoba.poo2024.allmusic.entities.User;
import ar.edu.unnoba.poo2024.allmusic.exceptions.CancionNoEncontrada;
import ar.edu.unnoba.poo2024.allmusic.exceptions.PlaylistNoEncontradaException;
import ar.edu.unnoba.poo2024.allmusic.services.AuthorizationService;
import ar.edu.unnoba.poo2024.allmusic.services.PlaylistService;
import ar.edu.unnoba.poo2024.allmusic.services.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/playlist") // Borrar?
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @Autowired
    AuthorizationService authorizationService;

    @GetMapping("{id}")
    public ResponseEntity<?> getPlaylistById(@PathVariable Long id) throws PlaylistNoEncontradaException {
        return ResponseEntity.ok(playlistService.getPlaylistById(id));
    }

    @GetMapping
    public ResponseEntity<?> getAllPlaylists() {
        List<PlaylistResponseDTO> playlists = playlistService.getAllPlaylists();
        return ResponseEntity.ok(playlists);
    }

    @GetMapping("me/playlists")
    public ResponseEntity<?> getPlaylistByMe(@RequestHeader("Authorization") String token) throws Exception {

        if(authorizationService.authorize(token) == null){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized");
        }

        User user = authorizationService.authorize(token);
        return ResponseEntity.ok(playlistService.playlistsByMe(user));
    }

    @PostMapping
    public ResponseEntity<?> addPlaylist(@RequestHeader("Authorization") String token,
         @RequestBody PlaylistCreateUpdateDTO playlistCreateUpdateDTO) throws Exception {

        if(authorizationService.authorize(token) == null){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized");
        }

        User user = authorizationService.authorize(token);
        playlistService.createPlaylist(playlistCreateUpdateDTO, user);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("{id}/songs")
    public ResponseEntity<?> addSongToPlaylist(@RequestHeader("Authorization") String token,
            @PathVariable Long id, @RequestBody Map<String, Long> body) throws Exception {

        if(authorizationService.authorize(token) == null){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized");
        }
        User user = authorizationService.authorize(token);
        Long songId = body.get("song_id");

        playlistService.addSongToPlaylist(id, songId, user.getUsername());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updatePlaylist(@RequestHeader("Authorization") String token,
        @PathVariable Long id, @RequestBody PlaylistCreateUpdateDTO playlistCreateUpdateDTO) throws Exception {

        if(authorizationService.authorize(token) == null){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized");
        }
        User user = authorizationService.authorize(token);
        playlistService.updatePlaylistById(id, playlistCreateUpdateDTO, user.getUsername());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deletePlaylist(@RequestHeader("Authorization") String token, @PathVariable Long id)
        throws Exception {

        if(authorizationService.authorize(token) == null){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized");
        }
        User user = authorizationService.authorize(token);
        playlistService.deletePlaylistById(id, user.getUsername());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{playlistId}/songs/{idSong}")
    public ResponseEntity<?> deleteSongFromPlaylist(@RequestHeader("Authorization") String token,
            @PathVariable Long playlistId, @PathVariable Long idSong) throws Exception {

        if(authorizationService.authorize(token) == null){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized");
        }

        User user = authorizationService.authorize(token);
        playlistService.deleteSongToPlaylist(playlistId, idSong, user.getUsername());
        return ResponseEntity.ok().build();
    }

}
