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
import org.springframework.http.HttpStatusCode;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/songs")
public class SongResource {

    @Autowired
    SongService songService;
    
    @Autowired
    AuthorizationService authorizationService;
    
    @Autowired
    ModelMapper modelMapper;

    @GetMapping()
    public ResponseEntity<?> getSong(@RequestHeader("Authorization") String token) throws Exception{

        if(authorizationService.authorize(token) == null){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);        
        }

        List<Song> songs = songService.getAll();
        List<SongResponseDTO> songDTOs = modelMapper.map(songs, new TypeToken<List<SongResponseDTO>>() {}.getType());
        return new ResponseEntity<>(songDTOs, HttpStatus.OK);
    }
}
