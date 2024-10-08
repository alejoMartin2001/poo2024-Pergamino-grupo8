package com.example.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.web.bind.annotation.*;
    import com.example.demo.entities.City;
import com.example.demo.entities.Contiene;
import com.example.demo.service.ImpCityRepository;
import com.example.demo.service.ImpContieneRepository;

import java.util.List;
    
    @RestController
    @RequestMapping("/api/tasks")

public class ControladorCity {
    @Autowired
        private ImpCityRepository impCityRepository;
    
        @GetMapping
        public List<City> getAllTasks() {
            return impCityRepository.findAll();
        }
    
        @PostMapping
        public City createTask(@RequestBody City city) {
            return impCityRepository.save(city);
        }
    
        @DeleteMapping("/{id}")
        public void deleteTask(@PathVariable Integer id) {
            impCityRepository.deleteById(id);
        }
    
        @PutMapping("path/{id}")
        public City putMethodName(@PathVariable Integer id, @RequestBody City city) {
            return city;
        }
}
