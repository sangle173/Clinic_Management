package com.example.clinic.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class PatientDTO {

    private Long id;
    private String name;
    private String gender;
    private String phoneNumber;
    private String yearOfBirth;
    private LocalDate createdDate;
    private String address;
    private String weight;
    private String height;
    private Long historyId;
}
