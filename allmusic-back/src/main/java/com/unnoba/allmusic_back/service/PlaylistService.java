package com.unnoba.allmusic_back.service;

import com.unnoba.allmusic_back.dto.favorite.FavoriteCreateDto;
import com.unnoba.allmusic_back.dto.playlist.SectionDto;
import com.unnoba.allmusic_back.dto.playlist.PlaylistRequestDto;
import com.unnoba.allmusic_back.dto.playlist.PlaylistResponseDto;
import com.unnoba.allmusic_back.dto.playlist.PlaylistUpdateDto;
import com.unnoba.allmusic_back.dto.song.SongResponseDto;
import com.unnoba.allmusic_back.dto.song.SongToPlaylistDto;
import com.unnoba.allmusic_back.entity.MusicArtiesUser;
import com.unnoba.allmusic_back.entity.Playlist;
import com.unnoba.allmusic_back.entity.Song;
import com.unnoba.allmusic_back.entity.User;
import com.unnoba.allmusic_back.repository.PlaylistRepository;
import com.unnoba.allmusic_back.repository.SongRepository;
import com.unnoba.allmusic_back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private FavotiresService favotiresService;

    @Autowired
    private S3Service s3Service;

    /**
     * Crea una playlist vacía.
     * @param playlistRequestDto son los datos para crear una playlist vacía.
     * @param username es el nombre de usuario.
     */
    @Transactional
    public void createPlaylist(PlaylistRequestDto playlistRequestDto, String username) {
        try{
            Playlist playlist = this.mapToPlaylist(playlistRequestDto, username);
            this.playlistRepository.save(playlist);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al crear el playlist");
        }
    }

    /**
     * Agrega una canción a la playlist del propietario autenticado. La canción tiene que existir.
     * @param songToPlaylistDto son los datos de la canción ya existente.
     */
    @Transactional
    public void addSongsToPlaylist(SongToPlaylistDto songToPlaylistDto) {

        Playlist playlist = playlistRepository.findById(songToPlaylistDto.getPlaylistId()).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "La Playlist no existe"
                )
        );

        Song song = songRepository.findById(songToPlaylistDto.getSongId()).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "La canción no existe"
                )
        );

        if (playlist.getSongs().contains(song))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "La canción ya existe en la playlist");

        try {
            playlist.getSongs().add(song);
            songRepository.save(song);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al agregar la canción");
        }
    }

    /**
     * Devuelve todas las playlists de un usuario.
     * @param username es el nombre de usuario cuyas playlists queremos.
     * @return retorna todas sus playlists.
     */
    public List<SectionDto> getAllPlaylistsByUsername(String username) {
        List<Playlist> playlist = playlistRepository.findPlaylistByOwnerUsername(username);

        try {
            return playlist.stream().map(this::mapToSectionDto).collect(Collectors.toList());
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error al retornar la/s playlist/s"
            );
        }
    }

    public PlaylistResponseDto getPlaylistById(Long playlistId) {
        Playlist playlist = playlistRepository.findById(playlistId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El Playlist no existe")
        );
        try{
            return this.mapToDto(playlist);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al retornar el Playlist");
        }
    }

    /**
     * Cambia la visibilidad de la playlist.
     * @param playlistId es el ID de la playlist.
     */
    public boolean isPrivatePlaylist(Long playlistId){
        Playlist playlist = playlistRepository.findById(playlistId).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "La Playlist no existe"
                )
        );

        try{
            boolean isPrivate = playlist.isPrivate();
            playlist.setPrivate(!isPrivate);
            playlistRepository.save(playlist);
            return !isPrivate;
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error");
        }
    }

    /**
     * Actualiza el título, descripción y (Muy Pronto) la portada de la playlist.
     * @param playlistUpdateDto es la información a actualizar en la playlist.
     */
    public void updatePlaylist(PlaylistRequestDto playlistUpdateDto, Long playlistId) {

        Playlist playlist = playlistRepository.findById(playlistId).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "La Playlist no existe"
                )
        );

        try{
            if ( !(playlist.getTitle().equals(playlistUpdateDto.getTitle())) ) {
                playlist.setTitle(playlistUpdateDto.getTitle());
            }
            if ( !(playlist.getDescription().equals(playlistUpdateDto.getDescription())) ) {
                playlist.setDescription(playlistUpdateDto.getDescription());
            }
            if ( playlistUpdateDto.getImage() != null) {
                String fileCover = this.getImageUrl(playlistUpdateDto.getImage());
                playlist.setImageUrl(fileCover);
            }
            playlistRepository.save(playlist);
        }catch(Exception e){
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error al actualizar la playlist"
            );
        }
    }

    /**
     * Elimina la playlist del usuario autenticado.
     * @param playlistId es el ID de pla playlist.
     */
    @Transactional
    public void deletePlaylist(Long playlistId, String username) {

        Playlist playlist = playlistRepository.findById(playlistId).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "La Playlist no existe"
                )
        );

        try {
            favotiresService.removeFavotire(username, new FavoriteCreateDto(playlistId, null));
            playlistRepository.delete(playlist);
        }catch (Exception e){
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error al eliminar la playlist"
            );
        }
    }

    /**
     * Elimina una canción en la playlist.
     * @param username es el nombre de usuario del propietario de la playlist.
     * @param playlistDeleteSongDto contiene los datos de la canción a eliminar.
     */
    public void deleteSongByPlaylist(String username, SongToPlaylistDto playlistDeleteSongDto) {
        Playlist playlist = playlistRepository.findById(playlistDeleteSongDto.getPlaylistId()).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "La Playlist no existe"
                )
        );

        Song song = songRepository.findById(playlistDeleteSongDto.getSongId()).orElseThrow(
                () -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "La canción no existe"
                )
        );

        if (!playlist.getSongs().contains(song))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "La canción no existe en la playlist");

        try{
            playlist.getSongs().remove(song);
            playlistRepository.save(playlist);
        }catch (Exception e){
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error al eliminar la canción en la playlist"
            );
        }
    }

    private String getImageUrl(MultipartFile imagePlaylist) {
        String fileProfile;
        if (imagePlaylist == null || imagePlaylist.isEmpty()) { // Asegurar que no sea null ni esté vacío
            fileProfile = "https://allmusicstorage.s3.sa-east-1.amazonaws.com/playlists/playlist-default.png";
        } else {
            fileProfile = s3Service.uploadFile("playlists/", imagePlaylist);
        }
        return fileProfile;
    }

    private PlaylistResponseDto mapToDto(Playlist playlist) {
        String ownerName = playlist.getOwner().getFirstName() + " " + playlist.getOwner().getLastName();
        return PlaylistResponseDto.builder()
                .playlistId(playlist.getId_playlist())
                .title(playlist.getTitle())
                .description(playlist.getDescription())
                .owner(ownerName)
                .username(playlist.getOwner().getUsername())
                .isPrivate(playlist.isPrivate())
                .imageUrl(playlist.getImageUrl())
                .type("Playlist")
                // TODO: Este método no funciona!
                .songs(playlist.getSongs().stream().map(this::mapToSongDto).collect(Collectors.toList()))
                .build();
    }

    private SectionDto mapToSectionDto(Playlist playlist){
        String nameOwner = playlist.getOwner().getFirstName() + " " + playlist.getOwner().getLastName();
        return SectionDto.builder()
                .sectionId(playlist.getId_playlist())
                .sectionName(playlist.getTitle())
                .ownerName(nameOwner)
                .ownerUsername(playlist.getOwner().getUsername())
                .imageUrl(playlist.getImageUrl())
                .type("Playlist")
                .build();
    }

    private Playlist mapToPlaylist(PlaylistRequestDto playlistRequestDto, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado")
        );

        String fileProfile = this.getImageUrl(playlistRequestDto.getImage());

        Playlist playlist = new Playlist();
        playlist.setTitle(playlistRequestDto.getTitle());
        playlist.setImageUrl(fileProfile);
        playlist.setDescription(playlistRequestDto.getDescription());
        playlist.setPrivate(false);
        playlist.setOwner(user);

        user.getPlaylists().add(playlist);
        return playlist;
    }

    private SongResponseDto mapToSongDto(Song song) {
        return SongResponseDto.builder()
                .songId(song.getId_song())
                .title(song.getTitle())
                .artist(song.getArtists().stream().map(MusicArtiesUser::getArtistName).collect(Collectors.toList()))
                .duration(song.getDuration())
                .imageAlbum(song.getAlbum().getImageUrl())
                .albumId(song.getAlbum().getId_album())
                .albumName(song.getAlbum().getTitle())
                .genre(song.getGenre())
                .build();
    }

}
