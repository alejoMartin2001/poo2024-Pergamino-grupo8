package com.unnoba.allmusic_back.dto.user;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class UserResponseDto {
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String profilePicture;
    private String bio;

}
