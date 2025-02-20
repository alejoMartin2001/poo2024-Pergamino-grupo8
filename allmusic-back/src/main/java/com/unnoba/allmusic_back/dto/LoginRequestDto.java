package com.unnoba.allmusic_back.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginRequestDto {
    private String username;
    private String password;
}
