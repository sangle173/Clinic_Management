package com.example.clinic.service;

import com.example.clinic.model.Medicine;
import com.example.clinic.repositories.MedicineRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineServiceImpl implements CRUDService<Medicine> {
    @Autowired
    MedicineRepo medicineRepo;

    @Override
    public Page<Medicine> findAllByPage(int pageNum, String sortField, String sortDir, String keyword) {
        return null;
    }

    @Override
    public List<Medicine> findAll() {
        return medicineRepo.findAll();
    }

    @Override
    public void save(Medicine medicine) {
        medicineRepo.save(medicine);
    }

    @Override
    public Medicine findById(Long id) {
        return medicineRepo.findById(id).orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        medicineRepo.deleteById(id);
    }

    public List<Medicine> findByNameContaining(String keyword){
        return medicineRepo.findByMedicineNameContaining(keyword);
    }
}
