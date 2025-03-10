package com.unnoba.allmusic_back.dto.song;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SongToPlaylistDto {
    private Long playlistId;
    private Long songId;
}
