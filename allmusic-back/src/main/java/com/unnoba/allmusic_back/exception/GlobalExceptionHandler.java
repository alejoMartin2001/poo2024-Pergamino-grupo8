package com.unnoba.allmusic_back.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorMessage> handle(ResponseStatusException ex, HttpServletRequest request){
        ErrorMessage errorMessage = new ErrorMessage(
                ex.getReason(),
                request.getRequestURI()
        );
        return new ResponseEntity<>(errorMessage, ex.getStatusCode());
    }
}

