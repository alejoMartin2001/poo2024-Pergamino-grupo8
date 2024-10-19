package ar.edu.unnoba.poo2024.allmusic.services;

import ar.edu.unnoba.poo2024.allmusic.entities.Playlist;
import ar.edu.unnoba.poo2024.allmusic.entities.Song;
import ar.edu.unnoba.poo2024.allmusic.exceptions.CancionNoEncontrada;
import ar.edu.unnoba.poo2024.allmusic.exceptions.PlaylistNoEncontradaException;
import ar.edu.unnoba.poo2024.allmusic.repositories.PlaylistRepository;
import ar.edu.unnoba.poo2024.allmusic.repositories.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private SongRepository songRepository;

    public Playlist createPlaylist(Playlist playlist) throws CancionNoEncontrada {
        List<Song> songs = new ArrayList<>();

        for (Song song : playlist.getSongs()) {
            Song songExist = songRepository.findById(song.getId())
                    .orElseThrow(
                            () -> new CancionNoEncontrada("La canción en la Playlist no existe"));
            songs.add(songExist);
        }
        playlist.setSongs(songs);
        return playlistRepository.save(playlist);
    }

    public Playlist getPlaylist(Integer id) throws PlaylistNoEncontradaException {
        return playlistRepository.findById(id)
                .orElseThrow( () -> new PlaylistNoEncontradaException("Playlist No Encontrada."));
    }

    public List<Playlist> getAllPlaylists() {
        return playlistRepository.findAll();
    }
}
