package ar.edu.unnoba.poo2024.allmusic.services;

import java.util.List;

import ar.edu.unnoba.poo2024.allmusic.dto.SongResponseDTO;
import ar.edu.unnoba.poo2024.allmusic.entities.Song;

import org.springframework.stereotype.Service;

@Service
public interface SongService {

    //public Song createSong(Song song);

    public List<Song> getAll();
    List<SongResponseDTO> mapToDtoList(List<Song> songs );

    /*public Song getSongById(Integer id) throws CancionNoEncontrada {
        return songRepository.findById(id)
                .orElseThrow(() -> new CancionNoEncontrada("Canción No Encontrada."));
    }*/


}
