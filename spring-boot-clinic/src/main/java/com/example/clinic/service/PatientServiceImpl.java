package com.example.clinic.service;

import com.example.clinic.model.History;
import com.example.clinic.model.Patient;
import com.example.clinic.repositories.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class PatientServiceImpl implements CRUDService<Patient> {
    @Autowired
    PatientRepo patientRepo;

    @Override
    public Page<Patient> findAllByPage(int pageNum, String sortField, String sortDir, String keyword) {
        Sort sort = Sort.by(sortField);
        sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();
        int pageSize = 5;
        Pageable pageable = PageRequest.of(pageNum - 1, pageSize, sort);
        if (keyword != null) {
            return patientRepo.findByNameContainingAndAddressContainingAndPhoneNumberContaining(keyword, pageable);
        }
        return patientRepo.findAll(pageable);
    }

    @Override
    public List<Patient> findAll() {
        return patientRepo.findAll();
    }

    @Override
    public Patient save(Patient patient) {
        patient.setCreatedDate(LocalDate.now());
        return patientRepo.save(patient);
    }

    @Override
    public Patient findById(Long id) {
        Patient patient = patientRepo.findById(id).orElse(null);
        List<History> histories = patient.getExaminationHistory();
        Comparator<History> compareById =
                (History o1, History o2) -> o1.getId().compareTo(o2.getId());

        Collections.sort(histories, compareById.reversed());
        patient.setExaminationHistory(histories);
        return patient;
    }

    @Override
    public void deleteById(Long id) {
        patientRepo.deleteById(id);
    }

    public List<Patient> findByKeyword(String name, String address, String phoneNumber) {
        List<Patient> patients = patientRepo.findByNameContainingAndAddressContainingAndPhoneNumberContaining(name, address, phoneNumber);
        Comparator<Patient> compareById =
                (Patient o1, Patient o2) -> o1.getId().compareTo(o2.getId());

        Collections.sort(patients, compareById.reversed());
        return patients;
    }
}
