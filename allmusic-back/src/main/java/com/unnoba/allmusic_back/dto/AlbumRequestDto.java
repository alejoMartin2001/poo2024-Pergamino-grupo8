package com.unnoba.allmusic_back.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlbumRequestDto {
    private String albumName;
    private String imageUrl;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate releaseDate;
}
