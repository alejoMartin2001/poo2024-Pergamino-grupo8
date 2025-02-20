package com.unnoba.allmusic_back.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponseDto {
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String profilePicture;
    private String bio;

}
