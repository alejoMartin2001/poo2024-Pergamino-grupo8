package ar.edu.unnoba.poo2024.allmusic.entities;

import java.util.List;

import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class MusicArties extends User{
    
    @OneToMany(mappedBy = "author") 
    private List<Song> songs;

    public boolean canCreateSongs(){
        return true;
    }

    public void addSong(Song s){
        getSongs().add(s);
    }

    public void removeSong(Song s){
        getSongs().remove(s);
    }

}
