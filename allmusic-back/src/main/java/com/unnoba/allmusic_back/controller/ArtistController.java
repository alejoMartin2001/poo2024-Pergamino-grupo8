package com.unnoba.allmusic_back.controller;

import com.unnoba.allmusic_back.dto.user.ArtistResponseDto;
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

    @GetMapping("{username}")
    public ResponseEntity<ArtistResponseDto> getArtistByUsername(@PathVariable String username){
        ArtistResponseDto artistResponseDto = userService.getArtistByUsername(username);
        return ResponseEntity.ok().body(artistResponseDto);
    }

    private MusicArtiesUser mapToDtoArtist(UserRequestDto userRequestDto){
        MusicArtiesUser artist = userMapper.mapToUser(new MusicArtiesUser(), userRequestDto);
        artist.setArtistName(userRequestDto.getArtistName());
        return artist;
    }
}
