package ar.edu.unnoba.poo2024.allmusic.services;

import ar.edu.unnoba.poo2024.allmusic.dto.PlaylistCreateUpdateDTO;
import ar.edu.unnoba.poo2024.allmusic.dto.PlaylistResponseDTO;
import ar.edu.unnoba.poo2024.allmusic.dto.UserDTO;
import ar.edu.unnoba.poo2024.allmusic.entities.Playlist;
import ar.edu.unnoba.poo2024.allmusic.entities.Song;
import ar.edu.unnoba.poo2024.allmusic.entities.User;
import ar.edu.unnoba.poo2024.allmusic.exceptions.CancionNoEncontrada;
import ar.edu.unnoba.poo2024.allmusic.exceptions.PlaylistNoEncontradaException;
import ar.edu.unnoba.poo2024.allmusic.repositories.PlaylistRepository;
import ar.edu.unnoba.poo2024.allmusic.repositories.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private SongService songService;

    /**
     * Crea una Playlist. La lista estará vacía hasta que se agreguen canciones.
     * @param playlistCreateUpdateDTO tienen los datos para crear la playlist
     * @param user tiene la información del usuario que crea la playlist.
     */
    public void createPlaylist(PlaylistCreateUpdateDTO playlistCreateUpdateDTO, User user) {
        try{
            Playlist playlist = new Playlist();
            playlist.setNombre(playlistCreateUpdateDTO.getNombre());
            List<Song> songs = new ArrayList<>();
            playlist.setSongs(songs);
            playlist.setDescription("");
            playlist.setOwner(user);
            playlistRepository.save(playlist);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    /**
     * Retorna un listado de playlist. Cada playlist del listado tendrá el nombre y la cantidad de canciones.
     * @return un DTO con los resultados visibles de las playlists.
     */
    public List<PlaylistResponseDTO> getAllPlaylists() {
        List<Playlist> playlists = playlistRepository.findAll();
        return playlists
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Retorna un listado de playlist. Cada playlist del listado tendrá el nombre y la cantidad de canciones.
     * @param id es el ID de la playlist.
     * @return la playlist con el ID asociado.
     * @throws PlaylistNoEncontradaException en caso de que no se encuentre la playlist.
     */
    public Playlist getPlaylistById(Long id) throws PlaylistNoEncontradaException {
        return playlistRepository.findById(id)
                .orElseThrow( () -> new PlaylistNoEncontradaException("Playlist No Encontrada."));
    }

    /**
     * Actualiza el nombre de una playlist, solo el usuario que la creó puede hacerlo
     * @param id es el ID de la playlist
     * @param playlistCreateUpdateDTO contiene los datos a actualizar en la playlist.
     * @param username es el nombre del usuario que quiere actualizar la playlist.
     * @throws PlaylistNoEncontradaException si la playlist no se encuentra.
     */
    public void updatePlaylistById(Long id, PlaylistCreateUpdateDTO playlistCreateUpdateDTO, String username)
            throws PlaylistNoEncontradaException{

        Playlist playlist = playlistRepository.findById(id).orElseThrow(
                () -> new PlaylistNoEncontradaException("La playlist no fue encontrada!"));

        if(!playlist.getOwner().getUsername().equals(username))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "El usuario no puede actualizar esta playlist.");

        try{
            playlist.setNombre(playlistCreateUpdateDTO.getNombre());
            playlistRepository.save(playlist);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    /**
     * Borra una playlist específica, solo el usuario que la creó puede hacerlo
     * @param id es el ID de la playlist.
     * @param username es el nombre del usuario que quiere eliminar la playlist.
     * @throws PlaylistNoEncontradaException si la playlist no se encuentra.
     */
    public void deletePlaylistById(Long id, String username) throws PlaylistNoEncontradaException {
        Playlist playlist = playlistRepository.findById(id).orElseThrow(
                () -> new PlaylistNoEncontradaException("Playlist no encontrada!"));

        if(!playlist.getOwner().getUsername().equals(username))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "El usuario no puede eliminar esta playlist.");

        try{
            playlistRepository.delete(playlist);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }

    }

    /**
     * Agrega una cancion a una playlist, solo el usuario que creó la playlist puede hacerlo.
     * @param playlistId es el ID de la playlist.
     * @param songId es el ID de la canción que queremos agregar a la playlist.
     * @param username es el nombre del usuario que quiere modificar la playlist.
     * @throws PlaylistNoEncontradaException si la playlist no se encuentra.
     */
    public void addSongToPlaylist(Long playlistId, Long songId, String username )
            throws PlaylistNoEncontradaException {

        if (songId == null) {
            throw new  ResponseStatusException(HttpStatus.BAD_REQUEST, "El song no puede estar vacío");
        }

        Playlist playlist = playlistRepository.findById(playlistId).orElseThrow(
                () -> new PlaylistNoEncontradaException("Playlist no encontrada!"));

        if (!playlist.getOwner().getUsername().equals(username)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No tienes permisos para modificar esta playlist");
        }

        Song song = songRepository.findById(songId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Canción no encontrada"));

        try{
            playlist.getSongs().add(song);
            playlistRepository.save(playlist);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    /**
     * Borra una canción específica de una playlist, solo el usuario que creó la playlist puede hacerlo.
     * @param playlistId es el ID de la playlist.
     * @param songId es el ID de la canción que queremos agregar a la playlist.
     * @param username es el nombre del usuario que quiere modificar la playlist.
     * @throws PlaylistNoEncontradaException si la playlist no se encuentra.
     */
    public void deleteSongToPlaylist(Long playlistId, Long songId, String username)
            throws PlaylistNoEncontradaException {

        Playlist playlist = playlistRepository.findById(playlistId).orElseThrow(
                () -> new PlaylistNoEncontradaException("Playlist no encontrada!"));

        if (!playlist.getOwner().getUsername().equals(username)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No tienes permisos para modificar esta playlist");
        }

        Song songRemove = playlist.getSongs()
                .stream()
                .filter( song -> song.getId().equals(songId))
                .findFirst()
                .orElseThrow( () ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Canción no encontrada en la playlist") );

        try{
            playlist.getSongs().remove(songRemove);
            playlistRepository.save(playlist);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    /**
     * Mapeo personalizado de Playlist a PlaylistResponseDTO.
     * @param playlist es la playlist a convertir.
     * @return la playlist convertida a PlaylistResponseDTO.
     */
    private PlaylistResponseDTO mapToDTO(Playlist playlist) {
        PlaylistResponseDTO playlistDTO = new PlaylistResponseDTO();
        UserDTO userDTO = new UserDTO();
        playlistDTO.setId(playlist.getId());
        playlistDTO.setNombre(playlist.getNombre());
        playlistDTO.setDescripcion(playlist.getDescription());
        playlistDTO.setSongs(songService.mapToDtoList(playlist.getSongs()));

        userDTO.setId(playlist.getOwner().getId());
        userDTO.setNombre(playlist.getOwner().getUsername());
        playlistDTO.setOwner(userDTO);
        return playlistDTO;
    }

}
