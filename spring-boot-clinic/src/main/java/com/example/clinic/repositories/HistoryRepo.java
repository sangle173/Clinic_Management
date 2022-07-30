package com.example.clinic.repositories;

import com.example.clinic.model.ExamHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepo extends JpaRepository<ExamHistory, Long> {
}
