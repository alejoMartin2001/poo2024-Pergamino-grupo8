package com.unnoba.allmusic_back.service;

import com.unnoba.allmusic_back.dto.favorite.FavoriteCreateDto;
import com.unnoba.allmusic_back.repository.FavoritesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FavotiresService {

    @Autowired
    private FavoritesRepository FavoritesRepository;

    @Transactional
    public void createFavotire(String username, FavoriteCreateDto favoriteCreateDto) {

    }
}
