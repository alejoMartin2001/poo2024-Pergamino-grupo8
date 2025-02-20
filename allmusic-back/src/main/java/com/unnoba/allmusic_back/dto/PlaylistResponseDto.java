package com.unnoba.allmusic_back.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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
