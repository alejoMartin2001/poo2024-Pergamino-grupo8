package ar.edu.unnoba.poo2024.allmusic.services;

import org.springframework.stereotype.Service;
import ar.edu.unnoba.poo2024.allmusic.entities.User;

@Service
public interface AuthorizationService {
    public User authorize(String token) throws Exception;
}
