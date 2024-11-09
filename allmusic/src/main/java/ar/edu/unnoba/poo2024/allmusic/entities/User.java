package ar.edu.unnoba.poo2024.allmusic.entities;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity // Anotación para la persistencia de datos, osea para guardar los objetos de User,
//como tuplas en la base de datos.
@Setter //genera los setters
@Getter //genera setters
//genera los getters
//@Inheritance(strategy = InheritanceType.JOINED)  // Herencia JOINED entre User y subclases
@Table(name = "users")//define el nombre de la tabla de la bd, en donde vamos a guardar los datos
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)//definimos el tipo de herencia como SINGLE_TABLE
                                                    //que basicamente las subclases de User, van a guardarse en la misma tabla. 
@DiscriminatorColumn(name="user_type",
        discriminatorType = DiscriminatorType.STRING)// creamos la columna user_type, para que en la bd
                                                    //se identifiquen los distintos tipos de usuarios
public abstract class User {

    @Id //generamos un id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //especificamos que va a ser una PK autoincrementable
    private Integer id;
    @Column(name = "username") //creamos la columna username.
    private String username;
    @Column(name = "password")//creamos la columna password.
    private String password;

    public abstract boolean canCreateSongs();

}


