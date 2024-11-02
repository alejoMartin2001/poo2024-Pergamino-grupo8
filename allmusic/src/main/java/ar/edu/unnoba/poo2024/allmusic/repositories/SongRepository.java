package ar.edu.unnoba.poo2024.allmusic.repositories;

import ar.edu.unnoba.poo2024.allmusic.entities.Song;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song, Long> {
}
