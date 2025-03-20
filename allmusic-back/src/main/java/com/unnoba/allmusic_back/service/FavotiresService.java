package com.unnoba.allmusic_back.service;

import com.unnoba.allmusic_back.dto.favorite.FavoriteCreateDto;
import com.unnoba.allmusic_back.dto.playlist.SectionDto;
import com.unnoba.allmusic_back.entity.*;
import com.unnoba.allmusic_back.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class FavotiresService {

    private final FavoritesRepository favoritesRepository;
    private final PlaylistRepository playlistRepository;
    private final AlbumRepository albumRepository;
    private final UserRepository userRepository;

    public FavotiresService(
            FavoritesRepository favoritesRepository,
            PlaylistRepository playlistRepository,
            AlbumRepository albumRepository, UserRepository userRepository) {

        this.favoritesRepository = favoritesRepository;
        this.playlistRepository = playlistRepository;
        this.albumRepository = albumRepository;
        this.userRepository = userRepository;
    }

    /**
     * Verifica si la playlist está anclada.
     * @param username es el nombre de usuario.
     * @param playlistId es el ID de la playlist.
     * @return true si está anclado; caso contrario, false.
     */
    public boolean isPlaylistFavorite(String username, Long playlistId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no existe")
                );
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El playlist no existe")
                );

        return favoritesRepository.existsByUserAndPlaylist(user, playlist);
    }

    /**
     * Verifica si el álbum está anclado.
     * @param username es el nombre de usuario
     * @param albumId es el ID del álbum a verificar.
     * @return true si esta anclado. Caso contrario, false.
     */
    public boolean isAlbumFavorite(String username, Long albumId) {
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no existe")
        );

        Album album = albumRepository.findById(albumId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El album no existe")
        );
        return favoritesRepository.existsByUserAndAlbum(user, album);
    }

    /**
     * Agrega una playlist o un álbum en la lista de favoritos del usuario.
     * @param username es el nombre de usuario.
     * @param favoriteCreateDto contiene el ID de la playlist o del álbum.
     */
    @Transactional
    public void createFavotire(String username, FavoriteCreateDto favoriteCreateDto) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no existe"));

        UserFavorites userFavorites = new UserFavorites();
        userFavorites.setUser(user);

        // Si agrego la playlist nomás.
        if (favoriteCreateDto.getPlaylistId() != null) {
            Playlist playlist = playlistRepository.findById(favoriteCreateDto.getPlaylistId()).orElseThrow(
                    () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El playlist no existe")
            );

            if (favoritesRepository.existsByUserAndPlaylist(user, playlist)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "La playlist ya está anclada");
            }
            userFavorites.setPlaylist(playlist);
            userFavorites.setAlbum(null);
            favoritesRepository.save(userFavorites);

        // Si agrego el álbum nomás.
        } else if (favoriteCreateDto.getAlbumId() != null) {
            Album album = albumRepository.findById(favoriteCreateDto.getAlbumId()).orElseThrow(
                    () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El album no existe")
            );

            if (favoritesRepository.existsByUserAndAlbum(user, album)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "El álbum ya está anclada");
            }

            userFavorites.setAlbum(album);
            userFavorites.setPlaylist(null);
            favoritesRepository.save(userFavorites);
        } else {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Debe proporcionar una playlist o un álbum");
        }
    }

    /**
     * Devuelve todos los favoritos (playlists y álbumes) del usuario mapeados en SectionDto.
     * @param username es el nombre de usuario.
     * @return retorna favoritos del usuario mapeados a Section.
     */
    public List<SectionDto> getAllFavoritesByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no existe")
        );

        List<UserFavorites> favorites = user.getFavorites();

        try{

            return favorites.stream()
                    .map( fav -> {
                        if (fav.getPlaylist() != null) {
                            return this.mapToSectionDtoPlaylist(fav.getPlaylist());
                        } else if (fav.getAlbum() != null) {
                            return this.mapToSectionDtoAlbum(fav.getAlbum());
                        }
                        return null;
                    }).filter(Objects::nonNull).toList();
        }catch (Exception e){
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener tus playlists y álbumes"
            );
        }
    }

    /**
     * Elimina una playlist o un álbum de los favoritos del usuario.
     * @param username es el nombre de usuario.
     * @param favoriteCreateDto contiene el ID de la playlist o del álbum.
     */
    @Transactional
    public void removeFavotire(String username, FavoriteCreateDto favoriteCreateDto) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no existe"));

        // Si elimino la playlist nomás.
        if (favoriteCreateDto.getPlaylistId() != null) {
            Playlist playlist = playlistRepository.findById(favoriteCreateDto.getPlaylistId()).orElseThrow(
                    () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El playlist no existe")
            );

            favoritesRepository.deleteByUserAndPlaylist(user, playlist);

        // Si elimino el álbum nomás.
        } else if (favoriteCreateDto.getAlbumId() != null) {
            Album album = albumRepository.findById(favoriteCreateDto.getAlbumId()).orElseThrow(
                    () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El album no existe")
            );

            favoritesRepository.deleteByUserAndAlbum(user, album);
        } else {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Debe proporcionar una playlist o un álbum");
        }
    }

    private SectionDto mapToSectionDtoPlaylist(Playlist playlist) {
        return SectionDto.builder()
                .sectionId(playlist.getId_playlist())
                .sectionName(playlist.getTitle())
                .ownerName(playlist.getOwner().getFirstName() + " " + playlist.getOwner().getLastName())
                .ownerUsername(playlist.getOwner().getUsername())
                .imageUrl(playlist.getImageUrl())
                .type("Playlist")
                .build();
    }

    private SectionDto mapToSectionDtoAlbum(Album album) {
        String albumType = this.getAlbumType(album);
        return SectionDto.builder()
                .sectionId(album.getId_album())
                .sectionName(album.getTitle())
                .ownerName(album.getAuthor().getArtistName())
                .ownerUsername(album.getAuthor().getUsername())
                .imageUrl(album.getImageUrl())
                .type(albumType)
                .build();
    }

    private String getAlbumType(Album album){
        String typeAlbum;
//        ¡Mala práctica! :(
        if (album instanceof AlbumExtendedPlay) {
            typeAlbum = "EP";
        } else if (album instanceof AlbumLongPlay) {
            typeAlbum = "Álbum";
        } else {
            typeAlbum = "Sencillo";
        }
        return typeAlbum;
    }
}
