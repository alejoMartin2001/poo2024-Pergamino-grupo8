package ar.edu.unnoba.poo2024.allmusic.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ar.edu.unnoba.poo2024.allmusic.entities.User;

// Marca esta interfaz como un componente de repositorio en Spring, 
// lo que permite que sea detectada automáticamente para la inyección de dependencias.
@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
    // Método personalizado para buscar un usuario por su nombre de usuario.
    // La anotación @Query permite definir una consulta JPQL (Java Persistence Query Language).
    // En este caso, selecciona el usuario (User) cuyo nombre de usuario (username) coincide
    // con el valor del parámetro :username.
    @Query("SELECT u FROM User u WHERE u.username = :username")
    public User findByUsername(@Param("username") String username);
    // @Param vincula el parámetro "username" en la consulta JPQL con el parámetro del método.
    // Retorna un objeto User si encuentra una coincidencia en la base de datos.
}

