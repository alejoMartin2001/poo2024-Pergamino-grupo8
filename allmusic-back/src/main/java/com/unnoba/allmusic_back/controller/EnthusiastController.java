package com.unnoba.allmusic_back.controller;

import com.unnoba.allmusic_back.dto.user.UserRequestDto;
import com.unnoba.allmusic_back.entity.MusicEnthusiastUser;
import com.unnoba.allmusic_back.mapper.UserMapper;
import com.unnoba.allmusic_back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/enth")
public class EnthusiastController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;

    @PostMapping
    public ResponseEntity<?> createEnthusiast(@RequestBody UserRequestDto userRequestDto) {
        userService.registerUser(this.mapToDtoEnthusiast(userRequestDto));
        return ResponseEntity.ok().build();
    }

    private MusicEnthusiastUser mapToDtoEnthusiast(UserRequestDto userRequestDto){
        return userMapper.mapToUser(new MusicEnthusiastUser(), userRequestDto);
    }
}
