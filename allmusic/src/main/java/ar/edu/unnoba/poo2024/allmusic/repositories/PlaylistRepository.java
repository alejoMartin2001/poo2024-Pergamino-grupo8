package ar.edu.unnoba.poo2024.allmusic.repositories;

import ar.edu.unnoba.poo2024.allmusic.entities.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
}
