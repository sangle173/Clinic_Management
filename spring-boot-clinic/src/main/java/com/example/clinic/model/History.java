package com.example.clinic.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "histories")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long id;
    private LocalDate dateCreated;
    private Long unitPrice;
    private String note;
    private String doctorName;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    @JsonBackReference
    private Patient patient;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "patholo_history",
            joinColumns = {
                    @JoinColumn(name = "history_id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "patholo_id")
            }
    )
    @JsonManagedReference
    @JsonIgnore
    Set<Pathological> pathologicals = new HashSet<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "medicine_history",
            joinColumns = {
                    @JoinColumn(name = "history_id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "medicine_id")
            }
    )
    @JsonManagedReference
    @JsonIgnore
    private Set<Medicine> medicines = new HashSet<>();
}
