package ar.edu.unnoba.poo2024.allmusic.entities;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter //genera los setters
@Getter //genera los getters
@DiscriminatorValue("Enthusiast")
public class MusicEnthusiastUser extends User{

    public boolean canCreateSongs() {
        return false;
    }

    @Override
    public void example() {
        System.out.println(this.getUsername());
    }
}
