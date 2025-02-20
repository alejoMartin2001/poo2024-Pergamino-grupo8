package com.unnoba.allmusic_back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "songs")
public class Song {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Long id_song;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "duration", nullable = false)
    private int duration;

    @Enumerated(EnumType.STRING)
    @Column(name = "genre", nullable = false)
    private Genre genre;

    @ManyToOne
    @JoinColumn(name = "album_id", nullable = false)
    private Album album;

    @ManyToMany
    @JoinTable(
            name = "song_artist",
            joinColumns = @JoinColumn(name = "song_id"),
            inverseJoinColumns = @JoinColumn(name = "artist_id")
    )
    private List<MusicArtiesUser> artists = new ArrayList<>();

}