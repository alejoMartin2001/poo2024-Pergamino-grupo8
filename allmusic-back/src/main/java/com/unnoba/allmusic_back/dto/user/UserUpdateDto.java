package com.unnoba.allmusic_back.dto.user;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class UserUpdateDto {
  private String firstName;
    private String lastName;
    private String email;
    private String profilePicture;
    private String bio;
    private String password;
}
