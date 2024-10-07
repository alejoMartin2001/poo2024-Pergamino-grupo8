package com.example.demo.service;

import java.util.List;

import com.example.demo.entities.Country;
import com.example.demo.repository.CountryRepository;

public class ImpCountryRepository {

    private CountryRepository countryRep;

    public void getReferenceById(Country c){
        countryRep.getReferenceById(c.getId());
    }

    public List<Country> findAll(){
        return countryRep.findAll();
    }

    public Country save(Country c){
        return countryRep.save(c);
    }

    public void deleteById(Integer id){
        countryRep.deleteById(id);;
    }
}
