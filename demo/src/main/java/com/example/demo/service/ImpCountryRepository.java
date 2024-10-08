package com.example.demo.service;

import java.util.List;

import com.example.demo.entities.Country;
import com.example.demo.repository.CountryRepository;

public class ImpCountryRepository {

    private CountryRepository countryRep;

    public List<Country> findAll(){
        return countryRep.findAll(); //Lista todas las tuplas de la tabla Country
    }

    public Country getReferenceById(Integer id){
        return countryRep.getReferenceById(id); //Devuelve la entidad con ese id
    } 

    public void findById(Integer id){
        countryRep.findById(id); //recupera tupla por su ID
    }

    public Country save(Country c){
        return countryRep.save(c);  //agrega una tupla a Country
    } 

    public void deleteById(Integer id){
        countryRep.deleteById(id); //elimina la tupla con tal ID correspondiente
    }


    public void deleteAllInBatch(){
        countryRep.deleteAllInBatch(); //elimina todas las tuplas de Country
    }
}
