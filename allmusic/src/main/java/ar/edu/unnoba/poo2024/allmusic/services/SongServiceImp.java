package ar.edu.unnoba.poo2024.allmusic.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import ar.edu.unnoba.poo2024.allmusic.dto.SongCreateUpdateDTO;
import ar.edu.unnoba.poo2024.allmusic.dto.SongResponseDTO;
import ar.edu.unnoba.poo2024.allmusic.entities.Genre;
import ar.edu.unnoba.poo2024.allmusic.entities.MusicArtiesUser;
import ar.edu.unnoba.poo2024.allmusic.entities.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import ar.edu.unnoba.poo2024.allmusic.entities.Song;
import ar.edu.unnoba.poo2024.allmusic.repositories.SongRepository;
import org.springframework.web.server.ResponseStatusException;

@Service
public class SongServiceImp implements SongService{
    
    @Autowired
    SongRepository songRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<Song> getAll() {
        return songRepository.findAll();
    }

    /**
     * Use un mapeo personalizado.
     * @param songs es la lista con todas las canciones.
     * @return la lista de canciones mapeadas a SongResponseDTO
     */
    public List<SongResponseDTO> mapToDtoList(List<Song> songs ) {
        return songs
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    /**
     *  Retorna el listado de canciones. Se puede especificar el nombre del artista y/o el género
     *  para filtrar resultados.
     * @param artist es el nombre de artista.
     * @param genre es el nombre del género.
     * @return los resultados del filtrado.
     */
    public List<SongResponseDTO> getFilterArtistGenre(String artist, Genre genre) {
        try {
            List<Song> songs = songRepository.findByFilter(artist, genre);
            return this.mapToDtoList(songs);
        }catch(Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * Retorna una canción específica.
     * @param id es el ID de la canción.
     * @return la canción con el ID especificado.
     */
    @Override
    public SongResponseDTO getById(Long id) {
        Song song = songRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Song no encontrado"
        ));
        return this.mapToDto(song);
    }

    /**
     *  Crea una canción, solo usuarios artistas pueden hacerlo.
     * @param dto contiene los datos para crear la canción.
     * @param user es el usuario que quiere crear la canción.
     */
    public void createSong(SongCreateUpdateDTO dto, User user) {

        if (!user.canCreateSongs())
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "El usuario NO puede crear songs");

        try {
            Song song = new Song();
            song.setNombre(dto.getName());
            song.setGenre(dto.getGenre());
            song.setAuthor((MusicArtiesUser) user);
            songRepository.save(song);

        }catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al crear el song");
        }

    }

    /**
     * Actualiza el nombre y el género de una canción. Solo el usuario que creó la canción puede hacerlo.
     * @param id es el ID de la canción.
     * @param songCreateUpdateDTO es el body con los campos modificados (name, genre).
     */
    public void updateSongById(Long id, SongCreateUpdateDTO songCreateUpdateDTO, String username) {
        Song song = songRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Song no encontrado"
        ));

        if (!song.getAuthor().getUsername().equals(username))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "El usuario no tiene autorización para modificar el song");

        try{
            song.setNombre(songCreateUpdateDTO.getName());
            song.setGenre(songCreateUpdateDTO.getGenre());
            songRepository.save(song);
        }catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al actualizar el song");
        }
    }

    /**
     * Borra una canción específica. Solo el usuario que la creó puede hacerlo.
     * @param id es el ID de la canción.
     * @param username es el usuario que quiere eliminar la canción.
     */
    public void deleteSongById(Long id, String username) {
        Song song = songRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Song no encontrado")
        );

        if (!song.getAuthor().getUsername().equals(username))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "El usuario no tiene autorización para eliminar el song");

        try {
            songRepository.deleteById(song.getId());
        }catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al eliminar el song");
        }
    }

    /**
     * Retorna una lista de las canciones creadas por el usuario actual.
     * @param username es el nombre del usuario actual.
     * @return las canciones creadas por dicho usuario.
     */
    public List<SongResponseDTO> getSongByMe(String username){
        try {
            List<Song> songs = songRepository.findByAuthor(username);
            return this.mapToDtoList(songs);

        }catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener resultados");
        }
    }


    private SongResponseDTO mapToDto(Song song){
        SongResponseDTO dto = new SongResponseDTO();
        dto.setId(song.getId());
        dto.setName(song.getNombre());
        dto.setDescription(null); // No hay una descripción.
        dto.setGenre(song.getGenre());

        SongResponseDTO.Artist artist= dto.new Artist();
        artist.setId(song.getAuthor().getId());
        artist.setName(song.getAuthor().getUsername());
        dto.setArtist(artist);
        return dto;
    }
}
