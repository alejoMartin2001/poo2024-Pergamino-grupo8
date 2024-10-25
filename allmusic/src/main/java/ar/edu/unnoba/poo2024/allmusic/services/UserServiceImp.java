package ar.edu.unnoba.poo2024.allmusic.services;

import org.springframework.beans.factory.annotation.Autowired;

import ar.edu.unnoba.poo2024.allmusic.entities.User;
import ar.edu.unnoba.poo2024.allmusic.repositories.UserRepository;
import ar.edu.unnoba.poo2024.allmusic.util.PasswordEncoder;

public class UserServiceImp implements UserService{

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @SuppressWarnings("unchecked")
    public void create(User user) throws Exception{
        if(userRepository.getReferenceById(user.getId()) != null){
            throw new Exception();
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
    
}
