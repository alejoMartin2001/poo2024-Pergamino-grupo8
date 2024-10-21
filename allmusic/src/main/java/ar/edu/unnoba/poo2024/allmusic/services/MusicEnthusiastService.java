package ar.edu.unnoba.poo2024.allmusic.services;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ar.edu.unnoba.poo2024.allmusic.entities.MusicEnthusiastUser;
import ar.edu.unnoba.poo2024.allmusic.entities.Playlist;
import ar.edu.unnoba.poo2024.allmusic.entities.Song;
import ar.edu.unnoba.poo2024.allmusic.exceptions.CancionNoEncontrada;
import ar.edu.unnoba.poo2024.allmusic.exceptions.MusicoNoExiste;
import ar.edu.unnoba.poo2024.allmusic.repositories.MusicEnthusiastRepository;
import ar.edu.unnoba.poo2024.allmusic.repositories.PlaylistRepository;


@Service
public class MusicEnthusiastService{
    
    @Autowired
    private MusicEnthusiastRepository musicEnthusiastRepository;

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private SongService songService;

    //guardamos un musico
    public MusicEnthusiastUser saveMusicEnthusiast(MusicEnthusiastUser m){
        return musicEnthusiastRepository.save(m);
    }

    //guardamos un musico
    public void savePlayList(Playlist p, MusicEnthusiastUser m){
        playlistRepository.save(p);
        m.addPlaylist(p);
    }

    //listar todas las canciones
    public List<Song> listarSongsPlataforma() throws CancionNoEncontrada{
        return songService.getSongs();
    }

    //devuelve un MusicEnthusiastUser mediante su id
    public MusicEnthusiastUser playlistCreadasPorUsers(Integer id) throws MusicoNoExiste{
        if(musicEnthusiastRepository.getReferenceById(id).equals(musicEnthusiastRepository.getReferenceById(id))) {
            return musicEnthusiastRepository.getReferenceById(id);   
        }
        else{
            throw new MusicoNoExiste();
        }
    }

    //devuelve todos los MusicEnthusiastUser
    public List<MusicEnthusiastUser> cancionesEnPlat() throws MusicoNoExiste{
        if(musicEnthusiastRepository.findAll() == null){
            throw new MusicoNoExiste();
        }
        return musicEnthusiastRepository.findAll();
    }

    //eliminar todos los musicos
    public void deleteAllInBatch(){
        musicEnthusiastRepository.deleteAllInBatch();
    }

    //modificar un musico por id
    public void updateMusico(MusicEnthusiastUser otroMusico,MusicEnthusiastUser musicoModificar) throws MusicoNoExiste{
        //para asegurarnos que existe
        if(playlistCreadasPorUsers(musicoModificar.getId()) != null){
            musicoModificar.setId(otroMusico.getId());
            musicoModificar.setUsername(otroMusico.getUsername());
            musicoModificar.setPassword(otroMusico.getPassword());
            musicoModificar.setPlaylists(otroMusico.getPlaylists());
            musicoModificar = otroMusico;
            musicEnthusiastRepository.save(musicoModificar);
        }
    }

}
