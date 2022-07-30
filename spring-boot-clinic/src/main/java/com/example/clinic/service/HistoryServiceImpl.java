package com.example.clinic.service;

import com.example.clinic.model.ExamHistory;
import com.example.clinic.repositories.HistoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class HistoryServiceImpl implements CRUDService<ExamHistory> {
    @Autowired
    HistoryRepo historyRepo;

    @Override
    public Page<ExamHistory> findAllByPage(int pageNum, String sortField, String sortDir, String keyword) {
        return null;
    }

    @Override
    public List<ExamHistory> findAll() {
        return historyRepo.findAll();
    }

    @Override
    public ExamHistory save(ExamHistory examHistory) {
        examHistory.setDateCreated(LocalDate.now());
        return historyRepo.save(examHistory);
    }

    @Override
    public ExamHistory findById(Long id) {
        return historyRepo.findById(id).orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        historyRepo.deleteById(id);
    }
}
