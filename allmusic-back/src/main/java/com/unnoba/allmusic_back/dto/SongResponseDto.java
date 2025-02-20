package com.unnoba.allmusic_back.dto;

import com.unnoba.allmusic_back.entity.Genre;
import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SongResponseDto {
    private String title;
    private int duration;
    private Genre genre;
    private String albumName;
    private List<String> artist;
}

