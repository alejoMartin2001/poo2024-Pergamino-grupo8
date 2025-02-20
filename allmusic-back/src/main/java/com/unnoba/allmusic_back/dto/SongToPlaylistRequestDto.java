package com.unnoba.allmusic_back.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SongToPlaylistRequestDto {
    private String playlistTitle;
    private String songTitle;
    private String albumTitle;
}
