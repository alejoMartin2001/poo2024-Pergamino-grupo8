package com.unnoba.allmusic_back.repository;

import com.unnoba.allmusic_back.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SongRepository extends JpaRepository<Song, Long> {

    Optional<Song> findByTitleAndAlbumTitle(String title, String albumTitle);

}
