package com.unnoba.allmusic_back.service;

import com.unnoba.allmusic_back.dto.UserResponseDto;
import com.unnoba.allmusic_back.entity.User;
import com.unnoba.allmusic_back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public void registerUser(User userDto) {
        Optional<User> user = userRepository.findByUsername(userDto.getUsername());
        if (user.isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El Usuario ya existe.");

        if (userRepository.findByEmail(userDto.getEmail()).isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El Email de este usuario ya existe.");

        try{
            userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
            userRepository.save(userDto);
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Hubo un error en el registro.");
        }
    }

    /**
     * Se obtiene los datos del usuario mediante su nombre de usuario.
     * @param username es el nombre de usuario.
     * @return retorna la información del usuario.
     */
    public UserResponseDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no existe")
        );

        try{
            return this.mapToDto(user);
        }catch (Exception e){
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Hubo un error en la obtención del usuario."
            );
        }
    }

    private UserResponseDto mapToDto(User user) {
        return UserResponseDto.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .bio(user.getBio())
                .profilePicture(user.getProfilePicture())
                .email(user.getEmail())
                .build();
    }

}

