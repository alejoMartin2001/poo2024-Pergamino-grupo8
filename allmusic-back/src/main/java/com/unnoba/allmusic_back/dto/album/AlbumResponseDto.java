package com.unnoba.allmusic_back.dto.album;

import com.unnoba.allmusic_back.dto.song.SongRequestDto;
import com.unnoba.allmusic_back.dto.song.SongResponseDto;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AlbumResponseDto {
    private Long albumId;
    private String albumTitle;
    private String imageUrl;
    private String artistName;
    private String artistUsername;
    private String type;
    private LocalDate releaseDate;
    private List<SongResponseDto> songs;
}
