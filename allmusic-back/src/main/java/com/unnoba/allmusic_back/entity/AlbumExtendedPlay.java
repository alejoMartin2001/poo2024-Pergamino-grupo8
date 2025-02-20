package com.unnoba.allmusic_back.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("EP")
public class AlbumExtendedPlay extends Album {

    @Override
    public void validateAlbum() {
        int numSongs = this.getSongs().size();
        if (numSongs < 1 || numSongs > 5) {
            throw new IllegalArgumentException("Un EP debe tener entre 1 y 5 canciones.");
        }
    }
}