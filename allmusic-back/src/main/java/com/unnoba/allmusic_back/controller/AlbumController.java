package com.unnoba.allmusic_back.controller;

import com.unnoba.allmusic_back.dto.album.AlbumDto;
import com.unnoba.allmusic_back.dto.album.AlbumRequestDto;
import com.unnoba.allmusic_back.dto.album.AlbumResponseDto;
import com.unnoba.allmusic_back.dto.playlist.SectionDto;
import com.unnoba.allmusic_back.dto.song.SongRequestDto;
import com.unnoba.allmusic_back.entity.Album;
import com.unnoba.allmusic_back.entity.AlbumExtendedPlay;
import com.unnoba.allmusic_back.entity.AlbumLongPlay;
import com.unnoba.allmusic_back.entity.AlbumSingle;
import com.unnoba.allmusic_back.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AlbumController {

    @Autowired
    private AlbumService albumService;

    @PostMapping(value = "/albums/single", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createAlbumSingle(@ModelAttribute AlbumRequestDto albumRequestDto) {
        String username = this.getUsername();
        Album album = this.mapToAlbumSingle(albumRequestDto);
        albumService.createAlbum(album, username, albumRequestDto.getImageUrl());
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/albums/extended", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createAlbumExtended(@ModelAttribute AlbumRequestDto albumRequestDto) {
        String username = this.getUsername();
        Album album = this.mapToAlbumExtendedPlay(albumRequestDto);
        albumService.createAlbum(album, username, albumRequestDto.getImageUrl());
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/albums/long", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createAlbumLongPlay(@ModelAttribute AlbumRequestDto albumRequestDto) {
        String username = this.getUsername();
        Album album = this.mapToAlbumLongPlay(albumRequestDto);
        albumService.createAlbum(album, username, albumRequestDto.getImageUrl());
        return ResponseEntity.ok().build();
    }

    @PostMapping("albums/{albumId}")
    public ResponseEntity<?> addSongsInAlbum(
            @PathVariable Long albumId, @RequestBody List<SongRequestDto> songsRequestDtoList) {
        albumService.addSongsByAlbum(songsRequestDtoList, albumId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("album/{albumId}")
    public ResponseEntity<?> getAlbumById(@PathVariable Long albumId) {
        AlbumResponseDto albumResponseDto = albumService.getAlbumById(albumId);
        return ResponseEntity.ok().body(albumResponseDto);
    }

    @PostMapping("albums/artist/{username}")
    public ResponseEntity<?> getAlbumByArtist(@PathVariable String username) {
        List<SectionDto> albums = albumService.getAllAlbumsByMe(username);
        return ResponseEntity.ok().body(albums);
    }

    @GetMapping("albums")
    public ResponseEntity<List<SectionDto>> getAllAlbums() {
        List<SectionDto> albums = albumService.getAllAlbums();
        return ResponseEntity.ok().body(albums);
    }

    @GetMapping("albums/me")
    public ResponseEntity<List<SectionDto>> getAlbumsByMe() {
        String username = this.getUsername();
        List<SectionDto> albums = albumService.getAllAlbumsByMe(username);
        return ResponseEntity.ok(albums);
    }

    @PutMapping(value = "albums/{albumId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateAlbum(
            @PathVariable Long albumId, @ModelAttribute AlbumRequestDto albumRequestDto) {
        albumService.updateAlbum(albumRequestDto, albumId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("albums/{albumId}")
    public ResponseEntity<?> deleteAlbum(@PathVariable Long albumId) {
        albumService.deleteAlbum(albumId);
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
        return album;
    }

    private String getUsername(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
