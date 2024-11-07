package ar.edu.unnoba.poo2024.allmusic.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.unnoba.poo2024.allmusic.entities.Song;
import ar.edu.unnoba.poo2024.allmusic.repositories.SongRepository;

@Service
public class SongServiceImp implements SongService{
    
    @Autowired
    SongRepository songRepository;

    public List<Song> getAll(){
        //devuelve una lista de canciones ya que en SongRepository la Entidad que se puso fue Song
        return songRepository.findAll();
    }

    public Song createSong(Song song){
        return songRepository.save(song);}
}
