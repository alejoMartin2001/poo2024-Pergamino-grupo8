package com.unnoba.allmusic_back.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@DiscriminatorValue("ENTHUSIAST")
public class MusicEnthusiastUser extends User {

    @Override
    public boolean canCreateSongs(){
        return false;
    }
}