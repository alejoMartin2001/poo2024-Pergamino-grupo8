package ar.edu.unnoba.poo2024.allmusic.resource;

import java.util.List;

import javax.naming.AuthenticationException;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import ar.edu.unnoba.poo2024.allmusic.dto.SongResponseDTO;
import ar.edu.unnoba.poo2024.allmusic.entities.Song;
import ar.edu.unnoba.poo2024.allmusic.services.AuthorizationService;
import ar.edu.unnoba.poo2024.allmusic.services.SongService;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/songs")
public class SongResource {

    @Autowired
    SongService songService;
    
    @Autowired
    AuthorizationService authorizationService;


    @GetMapping
    public ResponseEntity<?> getSongs(@RequestHeader("Authorization") String token) throws Exception{

        if(authorizationService.authorize(token) == null){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized");
        }

        // Todo el tema del mapeo se hace en los services.
        List<Song> songs = songService.getAll();
        List<SongResponseDTO> songDTOs = songService.mapToDtoList(songs);

        return ResponseEntity.ok(songDTOs);
    }
    
}
