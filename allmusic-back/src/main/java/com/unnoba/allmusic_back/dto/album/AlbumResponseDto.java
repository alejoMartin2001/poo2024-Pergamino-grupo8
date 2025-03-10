package com.unnoba.allmusic_back.dto.album;

import com.unnoba.allmusic_back.dto.song.SongRequestDto;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AlbumResponseDto {
    private Long albumId;
    private String albumName;
    private String imageUrl;
    private String artistName;
    private LocalDate releaseDate;
    private List<SongRequestDto> songs;
}
