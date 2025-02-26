package com.unnoba.allmusic_back.controller;

import com.unnoba.allmusic_back.dto.UserResponseDto;
import com.unnoba.allmusic_back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{username}")
    public ResponseEntity<UserResponseDto> getUserInformation(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserByUsername(username));
    }
}
