package ar.edu.unnoba.poo2024.allmusic.controllers;

import ar.edu.unnoba.poo2024.allmusic.entities.Playlist;
import ar.edu.unnoba.poo2024.allmusic.entities.Song;
import ar.edu.unnoba.poo2024.allmusic.exceptions.CancionNoEncontrada;
import ar.edu.unnoba.poo2024.allmusic.services.PlaylistService;
import ar.edu.unnoba.poo2024.allmusic.services.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/playlist")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @Autowired
    private SongService songService;

//    @GetMapping
//    public ResponseEntity<Playlist> examplePlaylists() throws CancionNoEncontrada {
//        List<Song> songs = new ArrayList<>();
//        songs.add(songService.getSongById(1));
//        songs.add(songService.getSongById(2));
//
//        Playlist playlist = new Playlist();
//        playlist.setSongs(songs);
//        playlist.setNombre("Playlist 1");
//        playlist.setDescription("Descripción 1");
//
//        playlistService.createPlaylist(playlist);
//        return ResponseEntity.ok(playlist);
//    }

    @PostMapping
    public ResponseEntity<Playlist> addPlaylist(@RequestBody Playlist playlist) throws CancionNoEncontrada {
        Playlist playList = playlistService.createPlaylist(playlist);
        return ResponseEntity.status(HttpStatus.CREATED).body(playList);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllPlaylists() {
        List<Playlist> playlists = playlistService.getAllPlaylists();
        return ResponseEntity.ok(playlists);
    }
}
