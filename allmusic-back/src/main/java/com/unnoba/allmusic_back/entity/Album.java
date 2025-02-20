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
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "albums", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"title", "author_id"})
})
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "album_type", discriminatorType = DiscriminatorType.STRING)
public abstract class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_album;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "release_date", nullable = false)
    private LocalDate releaseDate;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private MusicArtiesUser author;

    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL)
    private List<Song> songs = new ArrayList<>();

    public abstract void validateAlbum();

}
