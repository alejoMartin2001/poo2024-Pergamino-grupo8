package com.unnoba.allmusic_back.controller;

import com.unnoba.allmusic_back.dto.album.AlbumDto;
import com.unnoba.allmusic_back.dto.album.AlbumRequestDto;
import com.unnoba.allmusic_back.dto.album.AlbumResponseDto;
import com.unnoba.allmusic_back.dto.song.SongRequestDto;
import com.unnoba.allmusic_back.entity.Album;
import com.unnoba.allmusic_back.entity.AlbumExtendedPlay;
import com.unnoba.allmusic_back.entity.AlbumLongPlay;
import com.unnoba.allmusic_back.entity.AlbumSingle;
import com.unnoba.allmusic_back.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AlbumController {

    @Autowired
    private AlbumService albumService;

    @PostMapping("/albums/single")
    public ResponseEntity<?> createAlbumSingle(@RequestBody AlbumRequestDto albumRequestDto) {
        String username = this.getUsername();
        Album album = this.mapToAlbumSingle(albumRequestDto);
        albumService.createAlbum(album, username);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/albums/extended")
    public ResponseEntity<?> createAlbumExtended(@RequestBody AlbumRequestDto albumRequestDto) {
        String username = this.getUsername();
        Album album = this.mapToAlbumExtendedPlay(albumRequestDto);
        albumService.createAlbum(album, username);
        return ResponseEntity.ok().build();
    }

    @PostMapping("albums/long")
    public ResponseEntity<?> createAlbumLongPlay(@RequestBody AlbumRequestDto albumRequestDto) {
        String username = this.getUsername();
        Album album = this.mapToAlbumLongPlay(albumRequestDto);
        albumService.createAlbum(album, username);
        return ResponseEntity.ok().build();
    }

    @PostMapping("albums/{albumName}")
    public ResponseEntity<?> addSongsInAlbum(
            @PathVariable String albumName, @RequestBody List<SongRequestDto> songsRequestDtoList) {
        String username = this.getUsername();
        albumService.addSongsByAlbum(songsRequestDtoList, albumName, username);
        return ResponseEntity.ok().build();
    }

    @GetMapping("albums")
    public ResponseEntity<List<AlbumDto>> getAllAlbums() {
        List<AlbumDto> albums = albumService.getAllAlbums();
        return ResponseEntity.ok().body(albums);
    }

    @GetMapping("albums/me")
    public ResponseEntity<List<AlbumResponseDto>> getAlbumsByMe() {
        String username = this.getUsername();
        List<AlbumResponseDto> albums = albumService.getAllAlbumsByMe(username);
        return ResponseEntity.ok(albums);
    }

    @PutMapping("albums/{albumName}")
    public ResponseEntity<?> updateAlbum(
            @PathVariable String albumName, @RequestBody AlbumRequestDto albumRequestDto) {
        String username = this.getUsername();
        albumService.updateAlbum(albumRequestDto, username, albumName);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("albums/{albumName}")
    public ResponseEntity<?> deleteAlbum(@PathVariable String albumName) {
        String username = this.getUsername();
        albumService.deleteAlbum(albumName, username);
        return ResponseEntity.ok().build();
    }

    //    Métodos privados - Mappers.
    private AlbumSingle mapToAlbumSingle(AlbumRequestDto albumRequestDto) {
        return mapToAlbum(new AlbumSingle(), albumRequestDto);
    }

    private AlbumExtendedPlay mapToAlbumExtendedPlay(AlbumRequestDto albumRequestDto) {
        return mapToAlbum(new AlbumExtendedPlay(), albumRequestDto);
    }

    private AlbumLongPlay mapToAlbumLongPlay(AlbumRequestDto albumRequestDto) {
        return mapToAlbum(new AlbumLongPlay(), albumRequestDto);
    }

    private <T extends Album> T mapToAlbum(T album, AlbumRequestDto albumRequestDto) {
        album.setTitle(albumRequestDto.getAlbumName());
        album.setReleaseDate(albumRequestDto.getReleaseDate());
        album.setImageUrl(albumRequestDto.getImageUrl());
        return album;
    }

    private String getUsername(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
