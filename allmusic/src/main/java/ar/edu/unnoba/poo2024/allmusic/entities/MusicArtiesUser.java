package ar.edu.unnoba.poo2024.allmusic.entities;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class MusicArtiesUser extends User{

    public boolean canCreateSongs(){
        return true;
    }

}
