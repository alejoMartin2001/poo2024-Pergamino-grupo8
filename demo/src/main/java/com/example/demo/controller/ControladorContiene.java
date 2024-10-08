package com.example.demo.controller;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.web.bind.annotation.*;
    import com.example.demo.entities.Contiene;
    import com.example.demo.service.ImpContieneRepository;
    
    import java.util.List;
    
    @RestController
    @RequestMapping("/api/tasks")

    public class ControladorContiene {    
        @Autowired
        private ImpContieneRepository impContieneRepository;
    
        @GetMapping
        public List<Contiene> getAllTasks() {
            return impContieneRepository.findAll();
        }
    
        @PostMapping
        public Contiene createTask(@RequestBody Contiene contiene) {
            return impContieneRepository.save(contiene);
        }
    
        @DeleteMapping("/{id}")
        public void deleteTask(@PathVariable Integer id) {
            impContieneRepository.deleteById(id);
        }
    
        @PutMapping("path/{id}")
        public Contiene putMethodName(@PathVariable Integer id, @RequestBody Contiene contiene) {
            return contiene;
        }
    
    }
