package com.unnoba.allmusic_back.repository;

import com.unnoba.allmusic_back.entity.Playlist;
import com.unnoba.allmusic_back.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    List<Playlist> findPlaylistByOwnerUsername(String username);

    Optional<Playlist> findByTitleAndOwner(String title, User owner);
}
