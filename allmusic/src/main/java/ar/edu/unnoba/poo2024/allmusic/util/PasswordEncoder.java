package ar.edu.unnoba.poo2024.allmusic.util;

import com.password4j.Password;

public class PasswordEncoder {

        //Password.hash(rawPassword) tomamos la contraseña en texto plano
        //encriptamos la contraseña del usuario con un algoritmo Bcrypt que genera el hash y
        // lo mostramos con getResult()
        public String encode(String rawPassword){
            return Password.hash(rawPassword).withBCrypt().getResult();
        }
        
        public boolean verify(String rawPassword,String encodedPassword){
            // Verifica si la contraseña en texto plano coincide con el hash
            return Password.check(rawPassword, encodedPassword).withBCrypt();
        }
    
}
