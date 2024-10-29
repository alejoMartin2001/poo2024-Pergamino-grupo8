package ar.edu.unnoba.poo2024.allmusic.resource;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ar.edu.unnoba.poo2024.allmusic.dto.CreateUserRequestDTO;
import ar.edu.unnoba.poo2024.allmusic.entities.MusicEnthusiastUser;
import ar.edu.unnoba.poo2024.allmusic.services.UserService;

@RestController
@RequestMapping("/enthusiat")
public class MusicEnthusiastUserResource{

    @Autowired
    //Esta clase se usa para mapear objetos con los mismos atributos iguales, pero que son de clases diferentes.
    private ModelMapper modelMapper; //clase para convertir un objeto de CreateUserRequestDTO
                                    // a un objeto de tipo MusicArtiesUser.
    @Autowired
    private UserService userService;

    @PostMapping
    //ResponseEntity se usa para controlar respuestas HTTP completas
    public ResponseEntity<String> createUser(@RequestBody CreateUserRequestDTO userRequestDto) {
        //hacemos un try por si no se crea un usuario correctamente
        try {
            //Convierte el objeto de la clase CreateUserRequestDTO a uno de MusicArtistUser con el metodo map.
            MusicEnthusiastUser musicEnthusiastUser = modelMapper.map(userRequestDto, MusicEnthusiastUser.class);

            // Delegar la creación del usuario a la capa de servicio
            userService.create(musicEnthusiastUser);

            // Retorna el estado 201 si el usuario se creo
            return new ResponseEntity<>("El usuario " + musicEnthusiastUser.getUsername()+" se creo correctamente", HttpStatus.CREATED);
            //podemos hacer que retorne una respuesta con un encabezado tambien:
            /*HttpHeaders headers = new HttpHeaders();
            headers.add("Location", "/user/" + musicEnthusiastUser.getId() + " /username/ " + musicEnthusiastUser.getUsername()... .getPassword()); */
        //si ocurre un error
        } catch (Exception e) {
            //retorna el 409
            return new ResponseEntity<>("Error al crear el usuario", HttpStatus.CONFLICT);
        }
    }
}
