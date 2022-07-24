package com.example.clinic.repositories;

import com.example.clinic.model.Pathological;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PathologicalRepo extends JpaRepository<Pathological, Long> {
    List<Pathological> findByPathologicalNameContainingOrderByPathologicalNameAsc(String keyword);
}
