package ar.edu.unnoba.poo2024.allmusic;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import ar.edu.unnoba.poo2024.allmusic.entities.MusicArtiesUser;
import ar.edu.unnoba.poo2024.allmusic.entities.User;
import ar.edu.unnoba.poo2024.allmusic.services.UserService;
import ar.edu.unnoba.poo2024.allmusic.util.PasswordEncoder;

@SpringBootApplication
public class AllmusicApplication {

    @Bean
    public PasswordEncoder returnPasswordEncoder() {
        return new PasswordEncoder();
    }

    public static void main(String[] args) {
        // Inicia el contexto de Spring
        ApplicationContext context = SpringApplication.run(AllmusicApplication.class, args);
    
        // Obtén el servicio de usuario y el codificador de contraseñas desde el contexto de Spring
        UserService userService = context.getBean(UserService.class);
        PasswordEncoder passwordEncoder = context.getBean(PasswordEncoder.class);
    
        // Crea un usuario sin asignar el id manualmente, el error era que seteabamos el usuario
        // y al ser autoincremental tenemos que dejar que lo haga la base de datos.
        User user = new MusicArtiesUser();
        user.setUsername("alejinho");
        user.setPassword(passwordEncoder.encode("psq"));
    
        try {
            // Llama al método create para guardar el usuario
            userService.create(user);
            System.out.println("Usuario creado exitosamente.");
        } catch (Exception e) {
            System.out.println("Error al crear el usuario: " + e.getMessage());
        }
    }
}
