package com.unnoba.allmusic_back.dto.user;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequestDto {
    private String firstName;
    private String artistName;
    private String lastName;
    private String email;
    private String username;
    private String password;
    private MultipartFile profilePicture;
    private String bio;
}
