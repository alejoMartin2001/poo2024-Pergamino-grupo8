package com.unnoba.allmusic_back.controller;

import com.unnoba.allmusic_back.dto.user.UserRequestDto;
import com.unnoba.allmusic_back.entity.MusicArtiesUser;
import com.unnoba.allmusic_back.mapper.UserMapper;
import com.unnoba.allmusic_back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/artist")
public class ArtistController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createArtist(@ModelAttribute UserRequestDto userRequestDto){
        userService.registerUser(this.mapToDtoArtist(userRequestDto), userRequestDto.getProfilePicture());
        return ResponseEntity.ok().build();
    }

    private MusicArtiesUser mapToDtoArtist(UserRequestDto userRequestDto){
        return userMapper.mapToUser(new MusicArtiesUser(), userRequestDto);
    }
}
