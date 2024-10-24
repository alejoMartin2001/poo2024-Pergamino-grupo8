package ar.edu.unnoba.poo2024.allmusic.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String description;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "playlist_song",
            joinColumns = @JoinColumn(name = "playlist"),
            inverseJoinColumns = @JoinColumn(name = "song")
    )
    private List<Song> songs = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")  // 'user_id' será la FK en la tabla 'Playlist' que apunta a 'User'
    private User owner;

}
