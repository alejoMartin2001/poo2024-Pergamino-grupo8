package com.unnoba.allmusic_back.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;


@Entity
@DiscriminatorValue("SINGLE")
public class AlbumSingle extends Album {

    @Override
    public void validateAlbum() {
        if (this.getSongs().size() != 1) {
            throw new IllegalArgumentException("Un SINGLE debe tener exactamente una canción.");
        }
    }
}