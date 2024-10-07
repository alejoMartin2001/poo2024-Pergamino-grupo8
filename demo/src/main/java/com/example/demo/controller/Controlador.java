package com.example.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.Task;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Country;
import com.example.demo.service.ImpCountryRepository;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class Controlador {

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

    @PutMapping("/{id}")
    public Country updateTask(@PathVariable Integer id, @RequestBody Country cDetails) {
        Country c = impCountryRepository.getReferenceById(cDetails.getId())
            .orElseThrow(() -> new RuntimeException("Task not found"));
        c.setName(cDetails.getName());
        return impCountryRepository.save(c);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Integer id) {
        impCountryRepository.deleteById(id);
    }
}
