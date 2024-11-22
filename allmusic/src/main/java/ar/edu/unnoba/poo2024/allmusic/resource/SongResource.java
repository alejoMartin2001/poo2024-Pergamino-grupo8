package ar.edu.unnoba.poo2024.allmusic.resource;

import java.util.List;

import javax.naming.AuthenticationException;

import ar.edu.unnoba.poo2024.allmusic.dto.SongCreateUpdateDTO;
import ar.edu.unnoba.poo2024.allmusic.entities.Genre;
import ar.edu.unnoba.poo2024.allmusic.entities.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import ar.edu.unnoba.poo2024.allmusic.dto.SongResponseDTO;
import ar.edu.unnoba.poo2024.allmusic.entities.Song;
import ar.edu.unnoba.poo2024.allmusic.services.AuthorizationService;
import ar.edu.unnoba.poo2024.allmusic.services.SongService;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/songs") // Borrar?
public class SongResource {

    @Autowired
    SongService songService;
    
    @Autowired
    AuthorizationService authorizationService;


    @GetMapping
    public ResponseEntity<?> getFilterSongs(
         @RequestParam(value = "artist", required = false) String artistName,
         @RequestParam(value = "genre", required = false) Genre genre) throws Exception {


        List<SongResponseDTO> songs = songService.getFilterArtistGenre(artistName, genre);
        return ResponseEntity.ok(songs);
    }

    @GetMapping("me/songs")
    public ResponseEntity<?> getSongsByMe(@RequestHeader("Authorization") String token) throws Exception {
        if(authorizationService.authorize(token) == null){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized");
        }

        User user = authorizationService.authorize(token);
        return ResponseEntity.ok(songService.getSongByMe(user.getUsername()));
    }

//    @GetMapping
//    public ResponseEntity<?> getSongs(@RequestHeader("Authorization") String token) throws Exception{
//
//        if(authorizationService.authorize(token) == null){
//            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized");
//        }
//
//        // Todo el tema del mapeo se hace en los services.
//        List<Song> songs = songService.getAll();
//        List<SongResponseDTO> songDTOs = songService.mapToDtoList(songs);
//
//        return ResponseEntity.ok(songDTOs);
//    }

    @GetMapping("{id}")
    public ResponseEntity<?> getSongById(@RequestHeader("Authorization") String token , @PathVariable("id") Long id)
            throws Exception{

        if(authorizationService.authorize(token) == null){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized");
        }

//        User user = authorizationService.authorize(token);
        SongResponseDTO songResponseDTO = songService.getById(id);
        return ResponseEntity.ok(songResponseDTO);
    }

    @PostMapping
    public ResponseEntity<?> createSong(@RequestHeader("Authorization") String token,
            @RequestBody SongCreateUpdateDTO songDTO) throws Exception{

        if(authorizationService.authorize(token) == null){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized");
        }

        User user = authorizationService.authorize(token);
        songService.createSong(songDTO, user);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("{id}")
    public ResponseEntity<?> updateSong(@RequestHeader("Authorization") String token,
            @PathVariable("id") Long id, @RequestBody SongCreateUpdateDTO songDTO) throws Exception{

        if(authorizationService.authorize(token) == null){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized");
        }

        User user = authorizationService.authorize(token);
        songService.updateSongById(id, songDTO, user.getUsername());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteSong(@RequestHeader("Authorization") String token , @PathVariable("id") Long id)
        throws Exception{

        if(authorizationService.authorize(token) == null){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized");
        }
        User user = authorizationService.authorize(token);
        songService.deleteSongById(id, user.getUsername());
        return ResponseEntity.ok().build();
    }
}
