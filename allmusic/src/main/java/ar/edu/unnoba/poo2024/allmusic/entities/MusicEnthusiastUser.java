package ar.edu.unnoba.poo2024.allmusic.entities;


import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter //genera los setters
@Getter //genera los getters


public class MusicEnthusiastUser extends User{

    public boolean canCreateSongs() {
        return false;
    }
}
