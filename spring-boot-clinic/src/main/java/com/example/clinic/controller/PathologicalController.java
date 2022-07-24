package com.example.clinic.controller;

import com.example.clinic.model.Medicine;
import com.example.clinic.model.Pathological;
import com.example.clinic.service.PathologicalServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/pathological")
public class PathologicalController {
    @Autowired
    PathologicalServiceImpl pathologicalService;

    @GetMapping("/list")
    public ResponseEntity<List<Pathological>> getAllPathological(@RequestParam("keyword") String keyword) {
        return new ResponseEntity<>(pathologicalService.findByNameContaining(keyword), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pathological> findPathologicalById(@PathVariable Long id) {
        return new ResponseEntity<>(pathologicalService.findById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/new", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Pathological> createNewPatient(@RequestBody Pathological pathological) {
        pathologicalService.save(pathological);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Pathological> deletePathological(@PathVariable("id") Long id) {
        pathologicalService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
