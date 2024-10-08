package com.example.demo.service;

import java.util.List;

import com.example.demo.entities.City;
import com.example.demo.repository.CityRepository;


public class ImpCityRepository {

    private CityRepository cityRep;

    public List<City> findAll(){
        return cityRep.findAll(); //Lista todas las tuplas de la tabla Country
    }

    public City getReferenceById(Integer id){
        return cityRep.getReferenceById(id); //Devuelve la entidad con ese id
    } 

    public void findById(Integer id){
        cityRep.findById(id); //recupera tupla por su ID
    }

    public City save(City c){
        return cityRep.save(c);  //agrega una tupla a Country
    } 

    public void deleteById(Integer id){
        cityRep.deleteById(id); //elimina la tupla con tal ID correspondiente
    }


    public void deleteAllInBatch(){
        cityRep.deleteAllInBatch(); //elimina todas las tuplas de Country
    }
}
