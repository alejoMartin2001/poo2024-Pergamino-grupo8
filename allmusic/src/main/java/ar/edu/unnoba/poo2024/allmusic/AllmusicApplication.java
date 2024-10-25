package ar.edu.unnoba.poo2024.allmusic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import ar.edu.unnoba.poo2024.allmusic.entities.MusicArtiesUser;
import ar.edu.unnoba.poo2024.allmusic.entities.User;
import ar.edu.unnoba.poo2024.allmusic.repositories.UserRepository;
import ar.edu.unnoba.poo2024.allmusic.util.PasswordEncoder;

@SpringBootApplication
public class AllmusicApplication {

    public static void main(String[] args) {
        SpringApplication.run(AllmusicApplication.class, args);
        /*PasswordEncoder p = new PasswordEncoder();
        User u = new MusicArtiesUser(); 
        u.setPassword("222001");
        System.out.println(p.encode(u.getPassword()));*/
    
    }

    // Declara el PasswordEncoder como un Bean
    //@Bean
    //public PasswordEncoder passwordEncoder() {
    //    return new PasswordEncoder();
    //}

}
