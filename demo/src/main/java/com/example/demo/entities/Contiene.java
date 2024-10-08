package com.example.demo.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "contiene")
public class Contiene {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idContiene; // ID autogenerado
    private Integer cityId;
    private Integer countryId;

    public Contiene(){}

    public Integer getIdContiene() {
        return idContiene;
    }
    public void setIdContiene(Integer idContiene) {
        this.idContiene = idContiene;
    }
    public Integer getCityId() {
        return cityId;
    }
    public void setCityId(Integer cityId) {
        this.cityId = cityId;
    }
    public Integer getCountryId() {
        return countryId;
    }
    public void setCountryId(Integer countryId) {
        this.countryId = countryId;
    }

}
