package com.example.clinic.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "patients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String gender;
    private String phoneNumber;
    private String monthOfBirth;
    private String yearOfBirth;
    private LocalDate createdDate;
    private String address;
    private String weight;
    private String height;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, targetEntity = History.class)
    @JsonManagedReference
    @JsonIgnore
    private List<History> examinationHistory = new ArrayList<>();
}
