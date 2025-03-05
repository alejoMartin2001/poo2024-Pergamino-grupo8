package com.unnoba.allmusic_back.dto.album;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlbumDto {
    private String albumName;
    private String artistName;
    private String artistUsername;
    private String imageUrl;
}
