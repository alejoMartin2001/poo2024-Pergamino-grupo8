package com.unnoba.allmusic_back.exception;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ErrorMessage {
    private String message;
    private int status;
    private String details;
}
