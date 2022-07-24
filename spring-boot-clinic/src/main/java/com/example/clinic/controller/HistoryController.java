package com.example.clinic.controller;

import com.example.clinic.StringHelper;
import com.example.clinic.model.History;
import com.example.clinic.model.Medicine;
import com.example.clinic.model.Pathological;
import com.example.clinic.model.Patient;
import com.example.clinic.model.dto.HistoryDTO;
import com.example.clinic.service.HistoryServiceImpl;
import com.example.clinic.service.MedicineServiceImpl;
import com.example.clinic.service.PathologicalServiceImpl;
import com.example.clinic.service.PatientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


@RestController
@CrossOrigin("*")
@RequestMapping("/histories")
public class HistoryController {
    @Autowired
    HistoryServiceImpl historyService;

    @Autowired
    PatientServiceImpl patientService;

    @Autowired
    PathologicalServiceImpl pathologicalService;

    @Autowired
    MedicineServiceImpl medicineService;

    @GetMapping("/list")
    public ResponseEntity<List<History>> getAllHistory() {
        return new ResponseEntity<>(historyService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<List<History>> findHistoryById(@PathVariable("patientId") Long id) {
        Patient patient = patientService.findById(id);
        return new ResponseEntity<>(patient.getExaminationHistory(), HttpStatus.OK);
    }


    @GetMapping("/nearly/{patientId}")
    public ResponseEntity<History> findNearlyHistoryById(@PathVariable("patientId") Long id) {
        Patient patient = patientService.findById(id);
        History history = patient.getExaminationHistory().get(0);
        return new ResponseEntity<>(history, HttpStatus.OK);
    }


    @PostMapping(value = "/new", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<History> createNewHistory(@RequestBody HistoryDTO historyDTO) {
        History history = new History();
        history.setNote(StringHelper.standardizedString(historyDTO.getNote()));
        history.setUnitPrice(historyDTO.getUnitPrice());
        history.setPatient(patientService.findById(historyDTO.getPatientId()));
        history.setDoctorName(historyDTO.getDoctorName());
        Set<Pathological> pathologicalSet = new HashSet<>();
        Pathological pathological = null;
        for (Long element : historyDTO.getPathological()) {
            pathological = pathologicalService.findById(element);
            pathologicalSet.add(pathological);
        }

        Set<Medicine> medicineSet = new HashSet<>();
        Medicine medicine = null;
        for (Long element : historyDTO.getMedicines()) {
            medicine = medicineService.findById(element);
            medicineSet.add(medicine);
        }
        history.setPathologicals(pathologicalSet);
        history.setMedicines(medicineSet);
        historyService.save(history);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<History> deleteHistory(@PathVariable("id") Long id) {
        historyService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
