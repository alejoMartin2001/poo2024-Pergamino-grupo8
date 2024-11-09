package ar.edu.unnoba.poo2024.allmusic.services;

import ar.edu.unnoba.poo2024.allmusic.entities.User;
//Clase que va a tener la lógia de negocio de User
public interface UserService {
    public void create(User user) throws Exception;

    public User findByUsername(String username);
}
