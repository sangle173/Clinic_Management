package com.example.clinic.service;

import com.example.clinic.StringHelper;
import com.example.clinic.model.Pathological;
import com.example.clinic.repositories.PathologicalRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PathologicalServiceImpl implements CRUDService<Pathological> {

    @Autowired
    PathologicalRepo pathologicalRepo;

    @Override
    public Page<Pathological> findAllByPage(int pageNum, String sortField, String sortDir, String keyword) {
        return null;
    }

    @Override
    public List<Pathological> findAll() {
        return pathologicalRepo.findAll();
    }

    @Override
    public Pathological save(Pathological pathological) {
        pathological.setPathologicalName(StringHelper.standardizedString(pathological.getPathologicalName()));
        return pathologicalRepo.save(pathological);
    }

    @Override
    public Pathological findById(Long id) {
        return pathologicalRepo.findById(id).orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        pathologicalRepo.deleteById(id);
    }

    public List<Pathological> findByNameContaining(String keyword) {
        return pathologicalRepo.findByPathologicalNameContainingOrderByPathologicalNameAsc(keyword);
    }
}
