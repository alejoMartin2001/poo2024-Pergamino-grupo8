package ar.edu.unnoba.poo2024.allmusic.services;

import java.util.List;
import ar.edu.unnoba.poo2024.allmusic.entities.Song;
import org.springframework.stereotype.Service;

@Service
public interface SongService {

    /*public Song createSong(Song song) {
        return songRepository.save(song);
    }*/

    public List<Song> getAll();

    /*public Song getSongById(Integer id) throws CancionNoEncontrada {
        return songRepository.findById(id)
                .orElseThrow(() -> new CancionNoEncontrada("Canción No Encontrada."));
    }*/

    /*public List<Song> getSongs() throws CancionNoEncontrada{
        int total = songRepository.findAll().size();
        for(Song s: songRepository.findAll()){
            if(total == 0){
                getSongById(s.getId());
                total--;
            }        
        }
        return songRepository.findAll();
    }*/
}
