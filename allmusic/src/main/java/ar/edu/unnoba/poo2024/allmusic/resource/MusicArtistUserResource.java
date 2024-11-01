package ar.edu.unnoba.poo2024.allmusic.resource;

import java.net.Authenticator;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ar.edu.unnoba.poo2024.allmusic.services.AuthenticathionService;
import ar.edu.unnoba.poo2024.allmusic.dto.AuthenticationRequestDTO;
import ar.edu.unnoba.poo2024.allmusic.dto.CreateUserRequestDTO;
import ar.edu.unnoba.poo2024.allmusic.entities.MusicArtiesUser;
import ar.edu.unnoba.poo2024.allmusic.exceptions.AuthenticationException;
import ar.edu.unnoba.poo2024.allmusic.services.UserService;

@RestController
@RequestMapping("/artist")
public class MusicArtistUserResource {

    @Autowired
    //Esta clase se usa para mapear objetos con los mismos atributos iguales, pero que son de clases diferentes.
    private ModelMapper modelMapper; //clase para convertir un objeto de CreateUserRequestDTO
                                    // a un objeto de tipo MusicArtiesUser.
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticathionService authenticationService;

    @PostMapping
    //ResponseEntity se usa para controlar respuestas HTTP completas
    public ResponseEntity<String> createUser(@RequestBody CreateUserRequestDTO userRequestDto) {
        //hacemos un try por si no se crea un usuario correctamente
        try {
            //Convierte el objeto de la clase CreateUserRequestDTO a uno de MusicArtistUser con el metodo map.
            MusicArtiesUser musicArtistUser = modelMapper.map(userRequestDto, MusicArtiesUser.class);

            // Delegar la creación del usuario a la capa de servicio
            userService.create(musicArtistUser);

            // Retorna el estado 201 si el usuario se creo
            return new ResponseEntity<>("El usuario " + musicArtistUser.getUsername()+" se creo correctamente", HttpStatus.CREATED);
            //podemos hacer que retorne una respuesta con un encabezado tambien:
            /*HttpHeaders headers = new HttpHeaders();
            headers.add("Location", "/user/" + musicArtistUser.getId() + " /username/ " + musicArtistUser.getUsername()... .getPassword()); */
        //si ocurre un error
        } catch (Exception e) {
            //retorna el 409
            return new ResponseEntity<>("Error al crear el usuario", HttpStatus.CONFLICT);
        }
    }

    //throws Exception esta porque el metodo authenticate, puede generar una Excepcion
    @PostMapping(value = "/auth", produces = "application/json")
    public ResponseEntity<?> authentication(@RequestBody AuthenticationRequestDTO authenticationRequestDTO) throws Exception {
        try {
            //mapeamos un usuario musico que era de la clase authenticationRequestDTO
            MusicArtiesUser musicArtistUser = modelMapper.map(authenticationRequestDTO, MusicArtiesUser.class);
            //lo autenticamos y guardamos el token
            String token = authenticationService.authenticate(musicArtistUser);

            // Retornar el token en un formato JSON en el body
            return ResponseEntity.ok().body(Map.of("token", token));
        //retornamos el httpstatus 401
        } catch (AuthenticationException auth) {
            return new ResponseEntity<>("Error al autenticar usuario", HttpStatus.UNAUTHORIZED);
        }
    }
}





