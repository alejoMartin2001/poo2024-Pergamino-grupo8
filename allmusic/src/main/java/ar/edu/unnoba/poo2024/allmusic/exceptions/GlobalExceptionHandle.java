package ar.edu.unnoba.poo2024.allmusic.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandle {

    @ExceptionHandler(PlaylistNoEncontradaException.class)
    public ResponseEntity<String> manejarAlbumNoEncontrado(PlaylistNoEncontradaException ex) {
        // Devuelve una respuesta con el mensaje de la excepción y un estado 404 Not Found
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CancionNoEncontrada.class)
    public ResponseEntity<String> manejarCancionesEncontradas(CancionNoEncontrada ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
