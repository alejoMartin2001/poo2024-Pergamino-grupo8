package ar.edu.unnoba.poo2024.allmusic.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.password4j.Password;
import ar.edu.unnoba.poo2024.allmusic.entities.User;
import ar.edu.unnoba.poo2024.allmusic.exceptions.PasswordEncoderExcepcion;
import ar.edu.unnoba.poo2024.allmusic.exceptions.UserPrincipalException;
import ar.edu.unnoba.poo2024.allmusic.util.JwtTokenUtil;
import ar.edu.unnoba.poo2024.allmusic.util.PasswordEncoder;

@Service
public class AuthenticathionServiceImp implements AuthenticathionService{

    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    /**
     * Se compara la contraseña sin encriptación (user) y la contraseña encriptada (storedUser)
     * @param user es el usuario que intenta hacer logging.
     * @return un token único si la contraseña es correcta.
     * @throws Exception si la contraseña es incorrecta.
     */
    public String authenticate(User user) throws Exception {

        // Buscar el usuario por su nombre de usuario
        User storedUser = userService.findByUsername(user.getUsername());
           
        if (storedUser == null) {
            throw new UserPrincipalException("El usuario no fue encontrado.");
        }
//        String rawPassword = user.getPassword();
//        String password = passwordEncoder.encode(user.getPassword());
//        Password.hash(rawPassword);

        // Verificar la contraseña ingresada en texto plano contra la almacenada encriptada
        if(!passwordEncoder.verify(user.getPassword(), storedUser.getPassword())) {
            throw new PasswordEncoderExcepcion("Contraseña incorrecta.");
        }
            
        // Generar el token JWT si la autenticación es exitosa
        return jwtTokenUtil.generateToken(user.getUsername());    
    }
}
