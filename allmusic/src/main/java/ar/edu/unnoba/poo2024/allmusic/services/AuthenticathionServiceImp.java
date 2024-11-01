package ar.edu.unnoba.poo2024.allmusic.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.unnoba.poo2024.allmusic.entities.User;
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

    public String authenticate(User user) throws Exception{
        try {
            // Buscar el usuario por su nombre de usuario
            if (userService.findByUsername(user.getUsername()) == null){
                            // Manejar excepciones o registrar errores
            throw new UserPrincipalException("El usuario no fue encontrado.");    
            }
            userService.findByUsername(user.getUsername());
            // Verificar la contraseña en texto plano con la encriptada
            passwordEncoder.verify(passwordEncoder.encode(user.getPassword()), user.getPassword());
            // Generar el token JWT si la autenticación es exitosa
            return jwtTokenUtil.generateToken(user.getUsername());
            
        }catch(IllegalArgumentException i){
            throw new IllegalArgumentException("Contraseña incorrecta.");
        }
        
    }


}
