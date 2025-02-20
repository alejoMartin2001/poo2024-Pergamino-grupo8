package com.unnoba.allmusic_back.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("LP")
public class AlbumLongPlay extends Album {

    @Override
    public void validateAlbum() {
        if (this.getSongs().size() <= 5) {
            throw new IllegalArgumentException("Un LP debe tener más de 5 canciones.");
        }
    }
}
