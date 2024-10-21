package ar.edu.unnoba.poo2024.allmusic.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ar.edu.unnoba.poo2024.allmusic.entities.MusicEnthusiastUser;

public interface MusicEnthusiastRepository extends JpaRepository<MusicEnthusiastUser,Integer>{
    
}
