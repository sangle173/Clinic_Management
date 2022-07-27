package com.example.clinic.service;

import org.springframework.data.domain.Page;

import java.util.List;

public interface CRUDService<E> {

    Page<E> findAllByPage(int pageNum, String sortField, String sortDir, String keyword);

    List<E> findAll();

    E save(E e);

    E findById(Long id);

    void deleteById(Long id);
}
