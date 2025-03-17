package com.unnoba.allmusic_back.mapper;

import com.unnoba.allmusic_back.dto.user.UserRequestDto;
import com.unnoba.allmusic_back.entity.MusicArtiesUser;
import com.unnoba.allmusic_back.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public <T extends User> T mapToUser(T user, UserRequestDto userRequestDto) {
        user.setFirstName(userRequestDto.getFirstName());
        user.setLastName(userRequestDto.getLastName());
        user.setEmail(userRequestDto.getEmail());
        user.setBio(userRequestDto.getBio());
        user.setUsername(userRequestDto.getUsername());
        user.setPassword(userRequestDto.getPassword());
        user.setProfilePicture("");

        return user;
    }
}
