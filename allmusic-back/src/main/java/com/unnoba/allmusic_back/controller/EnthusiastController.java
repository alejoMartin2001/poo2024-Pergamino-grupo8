package com.unnoba.allmusic_back.controller;

import com.unnoba.allmusic_back.dto.UserRequestDto;
import com.unnoba.allmusic_back.entity.MusicEnthusiastUser;
import com.unnoba.allmusic_back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/enth")
public class EnthusiastController {

    @Autowired
    private UserService userService;

//    @GetMapping

    @PostMapping
    public ResponseEntity<?> createEnthusiast(@RequestBody UserRequestDto userRequestDto) {
        userService.registerUser(this.mapToDtoEnthusiast(userRequestDto));
        return ResponseEntity.ok().build();
    }

    private MusicEnthusiastUser mapToDtoEnthusiast(UserRequestDto userRequestDto){
        MusicEnthusiastUser musicEnthusiastUser = new MusicEnthusiastUser();
        musicEnthusiastUser.setFirstName(userRequestDto.getFirstName());
        musicEnthusiastUser.setLastName(userRequestDto.getLastName());
        musicEnthusiastUser.setEmail(userRequestDto.getEmail());
        musicEnthusiastUser.setUsername(userRequestDto.getUsername());
        musicEnthusiastUser.setPassword(userRequestDto.getPassword());
        musicEnthusiastUser.setBio(userRequestDto.getBio());
        musicEnthusiastUser.setProfilePicture(userRequestDto.getProfilePicture());
        return musicEnthusiastUser;
    }
}
