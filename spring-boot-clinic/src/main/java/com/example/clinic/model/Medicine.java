package com.example.clinic.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "medicines")
@Getter
@Setter
@NoArgsConstructor
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medicine_id")
    private Long id;
    private String medicineName;

    @ManyToMany(mappedBy = "medicines", cascade = {CascadeType.ALL})
    @JsonBackReference
    private Set<History> histories = new HashSet<>();
}
