package com.unnoba.allmusic_back.repository;

import com.unnoba.allmusic_back.entity.UserFavorites;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoritesRepository extends JpaRepository<UserFavorites, Long> {
}
