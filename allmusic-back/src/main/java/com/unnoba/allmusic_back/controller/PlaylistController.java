package com.unnoba.allmusic_back.controller;

import com.unnoba.allmusic_back.dto.PlaylistRequestDto;
import com.unnoba.allmusic_back.dto.PlaylistResponseDto;
import com.unnoba.allmusic_back.dto.SongToPlaylistRequestDto;
import com.unnoba.allmusic_back.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
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
        return ResponseEntity.ok().build();
    }

    @PostMapping("/playlists/song")
    public ResponseEntity<?> addPlaylist(@RequestBody SongToPlaylistRequestDto songToPlaylistRequestDto) {
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

    private String getUsername(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
