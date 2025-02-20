package com.unnoba.allmusic_back.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlaylistRequestDto {
    public String title;
    public String imageUrl;
    public String description;
    @JsonProperty("isPrivate")
    private boolean isPrivate;
}

