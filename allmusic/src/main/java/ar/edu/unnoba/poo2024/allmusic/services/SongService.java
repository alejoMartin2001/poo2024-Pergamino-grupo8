package ar.edu.unnoba.poo2024.allmusic.services;

import java.util.List;
import ar.edu.unnoba.poo2024.allmusic.entities.Song;
import ar.edu.unnoba.poo2024.allmusic.exceptions.CancionNoEncontrada;
import ar.edu.unnoba.poo2024.allmusic.repositories.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SongService {

    @Autowired
    private SongRepository songRepository;

    public Song createSong(Song song) {
        return songRepository.save(song);
    }

    public Song getSongById(Integer id) throws CancionNoEncontrada {
        return songRepository.findById(id)
                .orElseThrow(() -> new CancionNoEncontrada("Canción No Encontrada."));
    }

    public List<Song> getSongs() throws CancionNoEncontrada{
        int total = songRepository.findAll().size();
        for(Song s: songRepository.findAll()){
            if(total == 0){
                getSongById(s.getId());
                total--;
            }        
        }
        return songRepository.findAll();
    }
}
