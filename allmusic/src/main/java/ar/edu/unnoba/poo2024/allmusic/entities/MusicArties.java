package ar.edu.unnoba.poo2024.allmusic.entities;

import java.util.List;

import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class MusicArties extends User{

    public boolean canCreateSongs(){
        return true;
    }

}
