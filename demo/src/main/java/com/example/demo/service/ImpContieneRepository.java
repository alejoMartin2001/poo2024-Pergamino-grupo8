package com.example.demo.service;

import java.util.List;

import com.example.demo.entities.Contiene;
import com.example.demo.repository.ContieneRepository;


public class ImpContieneRepository {

    private ContieneRepository contieneRep;

    public List<Contiene> findAll(){
        return contieneRep.findAll(); //Lista todas las tuplas de la tabla Country
    }

    public Contiene getReferenceById(Integer id){
        return contieneRep.getReferenceById(id); //Devuelve la entidad con ese id
    } 

    public void findById(Integer id){
        contieneRep.findById(id); //recupera tupla por su ID
    }

    public Contiene save(Contiene c){
        return contieneRep.save(c);  //agrega una tupla a Country
    } 

    public void deleteById(Integer id){
        contieneRep.deleteById(id); //elimina la tupla con tal ID correspondiente
    }


    public void deleteAllInBatch(){
        contieneRep.deleteAllInBatch(); //elimina todas las tuplas de Country
    }
}
