package com.example.clinic.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class HistoryDTO {
    private LocalDate dateCreated;
    private Long unitPrice;
    private String note;
    private String doctorName;
    private Long patientId;
    private Set<Long> pathological = new HashSet<>();
    private Set<Long> medicines = new HashSet<>();
}
