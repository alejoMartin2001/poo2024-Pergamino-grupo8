package com.unnoba.allmusic_back.dto.playlist;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.unnoba.allmusic_back.dto.song.SongResponseDto;
import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlaylistResponseDto {
    public String title;
    public String username;
    public String description;
    public String imageUrl;
    @JsonProperty("isPrivate")
    private boolean isPrivate;

    private List<SongResponseDto> songs;

}
