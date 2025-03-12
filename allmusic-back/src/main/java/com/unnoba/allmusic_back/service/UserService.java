package com.unnoba.allmusic_back.service;

import com.unnoba.allmusic_back.dto.user.UserResponseDto;
import com.unnoba.allmusic_back.dto.user.UserUpdateDto;
import com.unnoba.allmusic_back.entity.User;
import com.unnoba.allmusic_back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private S3Service s3Service;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public void registerUser(User userDto, MultipartFile image) {
        Optional<User> user = userRepository.findByUsername(userDto.getUsername());
        if (user.isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El Usuario ya existe.");

        if (userRepository.findByEmail(userDto.getEmail()).isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El Email de este usuario ya existe.");

        try{
            String fileProfile = s3Service.uploadFile("users/", image);
            userDto.setProfilePicture(fileProfile);
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

    /**
     * 
     * @param userUpdateDto
     * @param username
     */
   public void UpdateUser(UserUpdateDto userUpdateDto, String username){
        User user = userRepository.findByUsername(username).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no existe")
        );
        try{
            if(userUpdateDto.getBio() != null){
                user.setBio(userUpdateDto.getBio());
            }if(userUpdateDto.getFirstName() != null){
                user.setFirstName(userUpdateDto.getFirstName());
            }if(userUpdateDto.getEmail() != null){
                user.setEmail(userUpdateDto.getEmail());
            }if(userUpdateDto.getPassword() != null){
                user.setPassword(userUpdateDto.getPassword());
            }if(userUpdateDto.getLastName() != null){
                user.setLastName(userUpdateDto.getLastName());
            }if(userUpdateDto.getProfilePicture() != null){
                user.setProfilePicture(userUpdateDto.getProfilePicture());
            }
            userRepository.save(user);
        }catch(Exception e){
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error al actualizar el usuario"
            );
        }
   }
   /***
    @param username
    */
   public void deleteByUser(String username){
        User user = userRepository.findByUsername(username).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No se puede eliminar un usuario inexistente.")
        );
        try{
            userRepository.delete(user);
        }catch(Exception e){
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error al eliminar el usuario"
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

