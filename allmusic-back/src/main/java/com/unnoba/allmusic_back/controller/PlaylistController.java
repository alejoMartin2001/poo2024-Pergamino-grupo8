package com.unnoba.allmusic_back.controller;

import com.unnoba.allmusic_back.dto.playlist.PlaylistResponseDto;
import com.unnoba.allmusic_back.dto.playlist.SectionDto;
import com.unnoba.allmusic_back.dto.playlist.PlaylistRequestDto;
import com.unnoba.allmusic_back.dto.playlist.PlaylistUpdateDto;
import com.unnoba.allmusic_back.dto.song.SongToPlaylistDto;
import com.unnoba.allmusic_back.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @PostMapping(value = "/playlists", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createPlaylist(@ModelAttribute PlaylistRequestDto playlistRequestDto) {
        String username = this.getUsername();
        playlistService.createPlaylist(playlistRequestDto, username);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/playlists/song")
    public ResponseEntity<?> addPlaylist(@RequestBody SongToPlaylistDto songToPlaylistRequestDto) {
        String username = this.getUsername();
        playlistService.addSongsToPlaylist(songToPlaylistRequestDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("me/playlist")
    public ResponseEntity<List<SectionDto>> getPlaylistByMe() {
        String username = this.getUsername();
        List<SectionDto> playlists = playlistService.getAllPlaylistsByUsername(username);
        return ResponseEntity.ok(playlists);
    }

    @PostMapping("playlists/{id}")
    public ResponseEntity<PlaylistResponseDto> getPlaylistById(@PathVariable Long id) {
        PlaylistResponseDto playlistResponseDto = playlistService.getPlaylistById(id);
        return ResponseEntity.ok(playlistResponseDto);
    }

    @PatchMapping("/playlists/private/{playlistId}")
    public ResponseEntity<Boolean> changeIsPrivate(@PathVariable Long playlistId) {
        boolean isPrivate = playlistService.isPrivatePlaylist(playlistId);
        return ResponseEntity.ok(isPrivate);
    }

    @PutMapping("/playlists")
    public ResponseEntity<?> updatePlaylist(
            @RequestBody PlaylistUpdateDto playlistUpdateDto) {

        String username = this.getUsername();
        playlistService.updatePlaylist(playlistUpdateDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/playlists/{playlistId}")
    public ResponseEntity<?> deletePlaylist(@PathVariable Long playlistId) {
        String username = this.getUsername();
        playlistService.deletePlaylist(playlistId);
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
