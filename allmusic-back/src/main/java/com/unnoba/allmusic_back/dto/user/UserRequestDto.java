package com.unnoba.allmusic_back.dto.user;

import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequestDto {
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String password;
    private String profilePicture;
    private String bio;
}
