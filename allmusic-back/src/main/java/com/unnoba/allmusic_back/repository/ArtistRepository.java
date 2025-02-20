package com.unnoba.allmusic_back.repository;

import com.unnoba.allmusic_back.entity.MusicArtiesUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArtistRepository extends JpaRepository<MusicArtiesUser, Long> {

    Optional<MusicArtiesUser> findByUsername(String username);
}

