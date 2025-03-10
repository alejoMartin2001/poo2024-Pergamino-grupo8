package com.unnoba.allmusic_back.dto.song;

import com.unnoba.allmusic_back.entity.Genre;
import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SongResponseDto {
    private Long songId;
    private String title;
    private int duration;
    private Genre genre;
    private String albumName;
    private List<String> artist;
}

