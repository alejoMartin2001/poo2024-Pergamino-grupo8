package com.unnoba.allmusic_back.repository;

import com.unnoba.allmusic_back.entity.Album;
import com.unnoba.allmusic_back.entity.Playlist;
import com.unnoba.allmusic_back.entity.User;
import com.unnoba.allmusic_back.entity.UserFavorites;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoritesRepository extends JpaRepository<UserFavorites, Long> {

    boolean existsByUserAndPlaylist(User user, Playlist playlist);
    boolean existsByUserAndAlbum(User user, Album album);

    void deleteByUserAndPlaylist(User user, Playlist playlist);
    void deleteByUserAndAlbum(User user, Album album);
}
