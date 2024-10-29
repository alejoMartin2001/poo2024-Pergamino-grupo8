package ar.edu.unnoba.poo2024.allmusic.entities;

import jakarta.persistence.*;


import lombok.Getter;
import lombok.Setter;

@Entity
@Setter //genera los setters
@Getter
//genera los getters
//@Inheritance(strategy = InheritanceType.JOINED)  // Herencia JOINED entre User y subclases
@Table(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="user_type",
        discriminatorType = DiscriminatorType.STRING)
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;

    public abstract boolean canCreateSongs();

}


