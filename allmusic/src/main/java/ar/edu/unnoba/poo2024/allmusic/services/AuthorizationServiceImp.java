package ar.edu.unnoba.poo2024.allmusic.services;

import ar.edu.unnoba.poo2024.allmusic.exceptions.UserPrincipalException;
import org.springframework.beans.factory.annotation.Autowired;
import com.auth0.jwt.exceptions.JWTVerificationException;
import ar.edu.unnoba.poo2024.allmusic.entities.User;
import ar.edu.unnoba.poo2024.allmusic.util.JwtTokenUtil;

public class AuthorizationServiceImp {
  
  @Autowired
  JwtTokenUtil jwtTokenUtil;

  @Autowired
  UserService userService;

  public User authorize(String token)throws Exception{
    try{
      jwtTokenUtil.verify(token);
      jwtTokenUtil.getSubject(token);
      User usuario = userService.findByUsername(jwtTokenUtil.getSubject(token));
      return usuario;

    }catch(JWTVerificationException jwtVerificationException){
      throw new JWTVerificationException("Token invalido",jwtVerificationException);
    }catch(UserPrincipalException userPrincipal){
      throw new UserPrincipalException("El usuario no fue encontrado.");
    }
  }

}