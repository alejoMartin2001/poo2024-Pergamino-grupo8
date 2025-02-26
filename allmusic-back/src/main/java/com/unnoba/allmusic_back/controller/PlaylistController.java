package com.unnoba.allmusic_back.controller;

import com.unnoba.allmusic_back.dto.PlaylistRequestDto;
import com.unnoba.allmusic_back.dto.PlaylistResponseDto;
import com.unnoba.allmusic_back.dto.PlaylistUpdateDto;
import com.unnoba.allmusic_back.dto.SongToPlaylistDto;
import com.unnoba.allmusic_back.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @PostMapping("/playlists")
    public ResponseEntity<?> createPlaylist(@RequestBody PlaylistRequestDto playlistRequestDto) {
        String username = this.getUsername();
        playlistService.createPlaylist(playlistRequestDto, username);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/playlists/song")
    public ResponseEntity<?> addPlaylist(@RequestBody SongToPlaylistDto songToPlaylistRequestDto) {
        String username = this.getUsername();
        playlistService.addSongsToPlaylist(songToPlaylistRequestDto, username);
        return ResponseEntity.ok().build();
    }

    @GetMapping("me/playlist")
    public ResponseEntity<List<PlaylistResponseDto>> getPlaylistByMe() {
        String username = this.getUsername();
        List<PlaylistResponseDto> playlists = playlistService.getAllPlaylistsByUsername(username);
        return ResponseEntity.ok(playlists);
    }

    @PatchMapping("/playlists/private/{title}")
    public ResponseEntity<?> changeIsPrivate(@PathVariable String title) {
        String username = this.getUsername();
        playlistService.isPrivatePlaylist(title, username);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/playlists/{title}")
    public ResponseEntity<?> updatePlaylist(
            @RequestBody PlaylistUpdateDto playlistUpdateDto, @PathVariable String title) {

        String username = this.getUsername();
        playlistService.updatePlaylist(playlistUpdateDto, username, title);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/playlists/{title}")
    public ResponseEntity<?> deletePlaylist(@PathVariable String title) {
        String username = this.getUsername();
        playlistService.deletePlaylist(title, username);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/playlists/song")
    public ResponseEntity<?> deleteSongFromPlaylist(@RequestBody SongToPlaylistDto songToPlaylistDto) {
        String username = this.getUsername();
        playlistService.deleteSongByPlaylist(username, songToPlaylistDto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    private String getUsername(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
