package com.unnoba.allmusic_back.controller;

import com.unnoba.allmusic_back.dto.user.UserResponseDto;
import com.unnoba.allmusic_back.dto.user.UserUpdateDto;
import com.unnoba.allmusic_back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    //el user ya va a estar autenticado, porque se loguea antes de hacer operaciones.
    
    @GetMapping("/{username}")
    public ResponseEntity<UserResponseDto> getUserInformation(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserByUsername(username));
    }
    
    @PutMapping
    public ResponseEntity<?> putMethodName(@RequestBody UserUpdateDto userUpdateDto) {
        String username = this.getUsername();
        userService.UpdateUser(userUpdateDto, username);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUser(){
        String username = this.getUsername();
        userService.deleteByUser(username);
        return ResponseEntity.ok().build();
    }

    private String getUsername(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
