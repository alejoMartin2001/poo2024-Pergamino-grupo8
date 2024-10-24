package ar.edu.unnoba.poo2024.allmusic.entities;

import jakarta.persistence.Id;


import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;


@Setter //genera los setters
@Getter //genera los getters
@Entity
@Inheritance(strategy = InheritanceType.JOINED)  // Herencia JOINED entre User y subclases
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

