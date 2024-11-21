package ar.edu.unnoba.poo2024.allmusic.services;

import java.util.List;
import java.util.stream.Collectors;

import ar.edu.unnoba.poo2024.allmusic.dto.SongResponseDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.unnoba.poo2024.allmusic.entities.Song;
import ar.edu.unnoba.poo2024.allmusic.repositories.SongRepository;

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

    public Song createSong(Song song){
        return songRepository.save(song);
    }

    private SongResponseDTO mapToDto(Song song){
        SongResponseDTO dto = new SongResponseDTO();
        dto.setId(song.getId());
        dto.setName(song.getNombre());
        dto.setDescription(null); // No hay una descripción.
        dto.setGenre(song.getGenre());

        SongResponseDTO.Artist artist= dto.new Artist();
        artist.setId(song.getAuthor().getId().longValue());
        artist.setName(song.getAuthor().getUsername());
        dto.setArtist(artist);
        return dto;
    }
}
