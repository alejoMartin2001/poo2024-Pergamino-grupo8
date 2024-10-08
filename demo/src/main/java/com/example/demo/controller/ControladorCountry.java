package com.example.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.entities.Country;
import com.example.demo.service.ImpCountryRepository;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class ControladorCountry{

    @Autowired
    private ImpCountryRepository impCountryRepository;

    @GetMapping
    public List<Country> getAllTasks() {
        return impCountryRepository.findAll();
    }

    @PostMapping
    public Country createTask(@RequestBody Country country) {
        return impCountryRepository.save(country);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Integer id) {
        impCountryRepository.deleteById(id);
    }

    @PutMapping("path/{id}")
    public Country putMethodName(@PathVariable Integer id, @RequestBody Country country) {
        Country c = country;
        c.setName(country.getName());
        return c;
    }

}
