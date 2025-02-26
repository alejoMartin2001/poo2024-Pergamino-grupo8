package com.unnoba.allmusic_back.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SongToPlaylistDto {
    private String playlistTitle;
    private String songTitle;
    private String albumTitle;
}
