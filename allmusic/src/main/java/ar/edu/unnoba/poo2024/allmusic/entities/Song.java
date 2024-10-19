package ar.edu.unnoba.poo2024.allmusic.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Genre genre;
}
