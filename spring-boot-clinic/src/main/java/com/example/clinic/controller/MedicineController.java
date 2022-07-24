package com.example.clinic.controller;

import com.example.clinic.model.Medicine;
import com.example.clinic.model.Patient;
import com.example.clinic.service.MedicineServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/medicines")
public class MedicineController {
    @Autowired
    MedicineServiceImpl medicineService;

    @GetMapping("/list")
    public ResponseEntity<List<Medicine>> getAllMedicine(@RequestParam("keyword") String keyword) {
        return new ResponseEntity<>(medicineService.findByNameContaining(keyword), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicine> findMedicineById(@PathVariable Long id) {
        return new ResponseEntity<>(medicineService.findById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/new", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Medicine> createNewMedicine(@RequestBody Medicine medicine) {
        medicineService.save(medicine);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Medicine> deleteMedicine(@PathVariable("id") Long id) {
        medicineService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
