package com.example.demo.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "city")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idcity; // ID autogenerado

    private String nameCity; // Nombre del país

    // Constructor vacío
    public City() {
    }

    // Getters y Setters
    public Integer getIdCity() {
        return idcity;
    }

    public void setIdCity(Integer idcity) {
        this.idcity = idcity;
    }

    public String getNameCity() {
        return nameCity;
    }

    public void setName(String nameCity) {
        this.nameCity = nameCity;
    }

}
