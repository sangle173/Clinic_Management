package com.example.clinic.model.dto;

import com.example.clinic.model.Patient;
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
    private int weight;
    private int height;
    private Long historyId;

    public Patient changeDTOToObject (PatientDTO patientDTO) {
        Patient patient = new Patient();
        patient.setName(patientDTO.getName());
        patient.setGender(patientDTO.getGender());
        patient.setPhoneNumber(patientDTO.getPhoneNumber());
        patient.setYearOfBirth(patientDTO.getYearOfBirth());
        patient.setCreatedDate(LocalDate.now());
        patient.setAddress(patientDTO.getAddress());
        patient.setWeight(patientDTO.getWeight());
        patient.setHeight(patientDTO.getHeight());
        return patient;
    }
}
