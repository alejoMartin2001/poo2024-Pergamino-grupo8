package com.unnoba.allmusic_back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "playlists", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"title", "user_id"})
})
public class Playlist {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id_playlist;

    @Column(name = "title" , nullable = false)
    private String title;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "description")
    private String description;

    @Column(name = "is_private", nullable = false)
    private boolean isPrivate = false;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "playlist_song",
            joinColumns = @JoinColumn(name = "playlist_id"),
            inverseJoinColumns = @JoinColumn(name = "song_id")
    )
    private List<Song> songs = new ArrayList<>();
}
