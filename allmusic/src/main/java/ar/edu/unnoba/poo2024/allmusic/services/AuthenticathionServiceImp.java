package ar.edu.unnoba.poo2024.allmusic.services;

import org.springframework.beans.factory.annotation.Autowired;

import ar.edu.unnoba.poo2024.allmusic.entities.User;
import ar.edu.unnoba.poo2024.allmusic.util.JwtTokenUtil;
import ar.edu.unnoba.poo2024.allmusic.util.PasswordEncoder;

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
            User existingUser = userService.findByUsername(user.getUsername());

            // Si el usuario no existe, lanzar una excepción
            if (existingUser == null) {
                throw new Exception("Usuario no encontrado.");
            }

            // Verificar la contraseña en texto plano con la encriptada

            boolean isPasswordValid = passwordEncoder.verify(passwordEncoder.encode(user.getPassword()), existingUser.getPassword());
            if (!isPasswordValid) {
                throw new Exception("La contraseña es incorrecta.");
            }

            // Generar el token JWT si la autenticación es exitosa
            return jwtTokenUtil.generateToken(user.getUsername());
            
        } catch (Exception e) {
            // Manejar excepciones o registrar errores
            throw new Exception("Error en la autenticación: " + e.getMessage());
        }
        
    }


}
