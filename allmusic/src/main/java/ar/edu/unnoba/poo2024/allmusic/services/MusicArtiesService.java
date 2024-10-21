package ar.edu.unnoba.poo2024.allmusic.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.unnoba.poo2024.allmusic.entities.MusicArties;
import ar.edu.unnoba.poo2024.allmusic.entities.Playlist;
import ar.edu.unnoba.poo2024.allmusic.entities.Song;
import ar.edu.unnoba.poo2024.allmusic.exceptions.CancionNoEncontrada;
import ar.edu.unnoba.poo2024.allmusic.exceptions.MusicoNoExiste;
import ar.edu.unnoba.poo2024.allmusic.repositories.MusicArtiesRepository;
import ar.edu.unnoba.poo2024.allmusic.repositories.PlaylistRepository;
import ar.edu.unnoba.poo2024.allmusic.repositories.SongRepository;

@Service
public class MusicArtiesService {

    @Autowired
    private MusicArtiesRepository musicArtiesRepository;

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private SongService songService;

    //guardamos un musico que creo una canción.
    public MusicArties saveMusicArties(MusicArties music){
        return musicArtiesRepository.save(music);
    }

    //creamos una cancion
    public void createSong(Song s, MusicArties music){
        songRepository.save(s);
        music.addSong(s);
    }

    //creamos una playlist
    public void createPlaylist(Playlist p, MusicArties music){
        playlistRepository.save(p);
        music.addPlaylist(p);
    }

    public List<Song> listarSongsPlataforma() throws CancionNoEncontrada{
        return songService.getSongs();
    }

    //devuelve un MusicEnthusiastUser mediante su id
    public MusicArties playlistCreadasPorUsers(Integer id) throws MusicoNoExiste{
        if(musicArtiesRepository.getReferenceById(id).equals(musicArtiesRepository.getReferenceById(id))) {
            return musicArtiesRepository.getReferenceById(id);   
        }
        else{
            throw new MusicoNoExiste();
        }
    }

    //devuelve todos los MusicEnthusiastUser
    public List<MusicArties> cancionesEnPlatf() throws MusicoNoExiste{
        if(musicArtiesRepository.findAll() == null){
            throw new MusicoNoExiste();
        }
        return musicArtiesRepository.findAll();
    }
}

