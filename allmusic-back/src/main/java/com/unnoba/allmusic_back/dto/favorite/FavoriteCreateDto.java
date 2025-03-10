package com.unnoba.allmusic_back.dto.favorite;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FavoriteCreateDto {
    private Long playlistId;
    private Long albumId;
}
