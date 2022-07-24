package com.example.clinic.repositories;

import com.example.clinic.model.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepo extends JpaRepository<Patient, Long> {
    @Query("select  p from Patient p where " +
            "concat(p.id, p.name, p.phoneNumber, p.yearOfBirth, p.weight, p.height)" +
            "like %?1%")
    Page<Patient> findByNameContaining(String keyword, Pageable pageable);

    List<Patient> findByNameContaining(String keyword);
}