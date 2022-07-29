package com.example.clinic.controller;

import com.example.clinic.StringHelper;
import com.example.clinic.model.Patient;
import com.example.clinic.service.PatientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/patients")
public class PatientController {
    @Autowired
    PatientServiceImpl patientService;

    @GetMapping("/list")
    public ResponseEntity<List<Patient>> getAllPatient(@RequestParam(value = "name", defaultValue = "") String name, @RequestParam(value = "address", defaultValue = "") String address,
                                                       @RequestParam(value = "phoneNumber", defaultValue = "") String phoneNumber) {
        return new ResponseEntity<>(patientService.findByKeyword(name, address,phoneNumber), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> findById(@PathVariable Long id) {
        Patient patient = patientService.findById(id);
        return new ResponseEntity<>(patient, HttpStatus.OK);
    }

    @PostMapping(value = "/new", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Patient> createNewPatient(@RequestBody Patient patient) {
        patient.setName(StringHelper.standardizedString(patient.getName()));
        Patient patient1 = patientService.save(patient);
        return new ResponseEntity<>(patient1, HttpStatus.CREATED);
    }

    @PutMapping(value = "/update/{patientId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Patient> createNewPatient(@RequestBody Patient patient, @PathVariable("patientId") Long id) {
        Patient patientExisting = patientService.findById(id);
        patientExisting.setName(patient.getName());
        patientExisting.setGender(patient.getGender());
        patientExisting.setPhoneNumber(patient.getPhoneNumber());
        patientExisting.setYearOfBirth(patient.getYearOfBirth());
        patientExisting.setCreatedDate(patient.getCreatedDate());
        patientExisting.setAddress(patient.getAddress());
        patientExisting.setWeight(patient.getWeight());
        patientExisting.setHeight(patient.getHeight());
        patientExisting.setName(StringHelper.standardizedString(patient.getName()));
        Patient patient1 = patientService.save(patientExisting);
        return new ResponseEntity<>(patient1, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Patient> deletePatient(@PathVariable("id") Long id) {
        patientService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
