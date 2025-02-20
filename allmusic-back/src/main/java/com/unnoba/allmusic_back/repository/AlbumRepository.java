package com.unnoba.allmusic_back.repository;

import com.unnoba.allmusic_back.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AlbumRepository extends JpaRepository<Album, Long> {

    List<Album> findAlbumByAuthorUsername(String username);

    @Query("SELECT a FROM Album a WHERE a.title = :title AND a.author.username = :username")
    Optional<Album> findAlbumByTitleAndArtist(@Param("title") String title, @Param("username") String username);

}
