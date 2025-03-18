package com.unnoba.allmusic_back.controller;

import com.unnoba.allmusic_back.dto.favorite.FavoriteCreateDto;
import com.unnoba.allmusic_back.dto.playlist.SectionDto;
import com.unnoba.allmusic_back.entity.UserFavorites;
import com.unnoba.allmusic_back.service.FavotiresService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("favorites")
public class FavoritesController {

    private final FavotiresService favotiresService;

    public FavoritesController(FavotiresService favotiresService) {
        this.favotiresService = favotiresService;
    }

    @PostMapping
    public ResponseEntity<?> addFavorite(@RequestBody FavoriteCreateDto favoriteCreateDto) {
        String username = this.getUsername();
        favotiresService.createFavotire(username, favoriteCreateDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<SectionDto>> getAllFavorites() {
        String username = this.getUsername();
        List<SectionDto> favorites = favotiresService.getAllFavoritesByUsername(username);
        return ResponseEntity.ok(favorites);
    }

    @GetMapping("/playlist/{playlistId}")
    public ResponseEntity<Boolean> isFavoritesByPlaylist(@PathVariable Long playlistId) {
        String username = this.getUsername();
        boolean isFavorite = this.favotiresService.isPlaylistFavorite(username, playlistId);
        return ResponseEntity.ok(isFavorite);
    }

    @GetMapping("/album/{albumId}")
    public ResponseEntity<Boolean> isFavoritesByAlbum(@PathVariable Long albumId) {
        String username = this.getUsername();
        boolean isFavorite = this.favotiresService.isAlbumFavorite(username, albumId);
        return ResponseEntity.ok(isFavorite);
    }

    @DeleteMapping
    public ResponseEntity<?> removeFavorite(@RequestBody FavoriteCreateDto favoriteCreateDto) {
        String username = this.getUsername();
        favotiresService.removeFavotire(username, favoriteCreateDto);
        return ResponseEntity.ok().build();
    }

    private String getUsername(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
