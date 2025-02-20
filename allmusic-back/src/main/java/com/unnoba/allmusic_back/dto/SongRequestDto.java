package com.unnoba.allmusic_back.dto;

import com.unnoba.allmusic_back.entity.Genre;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SongRequestDto {
    private String title;
    private int duration;
    private Genre genre;
}