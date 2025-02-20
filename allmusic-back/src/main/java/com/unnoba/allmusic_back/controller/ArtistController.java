package com.unnoba.allmusic_back.controller;

import com.unnoba.allmusic_back.dto.UserRequestDto;
import com.unnoba.allmusic_back.entity.MusicArtiesUser;
import com.unnoba.allmusic_back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/artist")
public class ArtistController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> createArtist(@RequestBody UserRequestDto userRequestDto){
        userService.registerUser(this.mapToDtoArtist(userRequestDto));
        return ResponseEntity.ok().build();
    }

    private MusicArtiesUser mapToDtoArtist(UserRequestDto userRequestDto){
        MusicArtiesUser musicArtiesUser = new MusicArtiesUser();
        musicArtiesUser.setFirstName(userRequestDto.getFirstName());
        musicArtiesUser.setLastName(userRequestDto.getLastName());
        musicArtiesUser.setEmail(userRequestDto.getEmail());
        musicArtiesUser.setUsername(userRequestDto.getUsername());
        musicArtiesUser.setPassword(userRequestDto.getPassword());
        musicArtiesUser.setBio(userRequestDto.getBio());
        musicArtiesUser.setProfilePicture(userRequestDto.getProfilePicture());
        return musicArtiesUser;
    }
}
