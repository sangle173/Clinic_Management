package com.example.clinic.service;

import com.example.clinic.model.History;
import com.example.clinic.repositories.HistoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class HistoryServiceImpl implements CRUDService<History> {
    @Autowired
    HistoryRepo historyRepo;

    @Override
    public Page<History> findAllByPage(int pageNum, String sortField, String sortDir, String keyword) {
        return null;
    }

    @Override
    public List<History> findAll() {
        return historyRepo.findAll();
    }

    @Override
    public History save(History history) {
        history.setDateCreated(LocalDate.now());
        return historyRepo.save(history);
    }

    @Override
    public History findById(Long id) {
        return historyRepo.findById(id).orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        historyRepo.deleteById(id);
    }
}
