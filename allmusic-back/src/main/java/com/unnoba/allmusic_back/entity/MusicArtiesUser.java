package com.unnoba.allmusic_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@DiscriminatorValue("ARTIST")
public class MusicArtiesUser extends User{

    @Column(name = "artist_name")
    private String artistName;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    private List<Album> albums = new ArrayList<>();

    @ManyToMany(mappedBy = "artists")
    private List<Song> songs = new ArrayList<>();

    @Override
    public boolean canCreateSongs(){
        return true;
    }

}
