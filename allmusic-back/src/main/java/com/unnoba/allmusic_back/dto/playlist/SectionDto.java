package com.unnoba.allmusic_back.dto.playlist;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SectionDto {
    private Long sectionId;
    private String sectionName;
    private String ownerName;
    private String ownerUsername;
    private String imageUrl;
    private String type;
}
