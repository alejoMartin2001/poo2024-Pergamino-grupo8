package com.unnoba.allmusic_back.controller;

import com.unnoba.allmusic_back.dto.user.UserRequestDto;
import com.unnoba.allmusic_back.entity.MusicEnthusiastUser;
import com.unnoba.allmusic_back.mapper.UserMapper;
import com.unnoba.allmusic_back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/enth")
public class EnthusiastController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createEnthusiast(@ModelAttribute UserRequestDto userRequestDto) {
        System.out.println("Imagen recibida: " + userRequestDto.getProfilePicture().getOriginalFilename());
        userService.registerUser(this.mapToDtoEnthusiast(userRequestDto), userRequestDto.getProfilePicture());
        return ResponseEntity.ok().build();
    }

    private MusicEnthusiastUser mapToDtoEnthusiast(UserRequestDto userRequestDto){
        return userMapper.mapToUser(new MusicEnthusiastUser(), userRequestDto);
    }
}
