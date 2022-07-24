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
@Table(name = "pathological")
@Getter
@Setter
@NoArgsConstructor
public class Pathological {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patholo_id")
    private Long id;
    private String pathologicalName;

    @ManyToMany(mappedBy = "pathologicals", cascade = {CascadeType.ALL})
    @JsonBackReference
    private Set<History> histories = new HashSet<>();
}
