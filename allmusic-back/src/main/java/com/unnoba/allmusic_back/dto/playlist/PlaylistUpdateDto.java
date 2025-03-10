package com.unnoba.allmusic_back.dto.playlist;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlaylistUpdateDto {
    private Long playlistId;
    private String title;
    private String description;
}
