package com.unnoba.allmusic_back.dto.playlist;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlaylistRequestDto {
    public String title;
    public MultipartFile image;
    public String description;
}

