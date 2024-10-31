package ar.edu.unnoba.poo2024.allmusic.util;

import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import ar.edu.unnoba.poo2024.allmusic.dto.CreateUserRequestDTO;


public class JwtTokenUtil {
    private final static String TOKEN = "SRFFewe3223423t65ndfdsfdsg";
    private final Date expirar = new Date();
    private static Algorithm algorithm = Algorithm.HMAC512(TOKEN);
    private CreateUserRequestDTO createUserRequestDTO;
    
    public String generateToken(String subject){
        try {
            //seteamos el usuario, asi lo podemos usar para verificar el token
            createUserRequestDTO.setUsername(subject);
            //Header del token, le agregamos el algoritmo HMAC 512
            expirar.setTime(864000000);
            //Payload token
            String token = JWT.create()
                .withIssuer(subject)
                .withExpiresAt(expirar)
                .sign(algorithm);
            return "Bearer " + token;
        } catch (JWTCreationException exception){
            //User invalido, devolvemos mensaje de JWTCreationException.
            return exception.getMessage();
        }
    }

    public boolean verify(String token){
        try{
            createUserRequestDTO.getUsername();
            //configuramos el verificador, con el algoritmo HMAC 512, habria 
            //que agregar tmb el usuario
            JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(createUserRequestDTO.getUsername())
                .build();
            //verifica el token   
            verifier.verify(token);
            return true;
        }catch(JWTVerificationException jwtVerificationException){
            return false;
        }
    }

    public String getSubject(String token){
        try {
            // Decodifica el token sin verificarlo
            DecodedJWT decodedJWT = JWT.decode(token);
    
            //devuelvo el payload completo del token
            return decodedJWT.getPayload(); 
        } catch (JWTDecodeException exception) {
            // Si el token no se pudo decodificar, retorna null o maneja el error
            return null;
        }
    }

}

