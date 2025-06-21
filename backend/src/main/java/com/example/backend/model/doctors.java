package com.example.backend.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity //table is created along with marking it as jpa entity which maps to database
@Data //creates boiler plate for getters,setters etc.
@NoArgsConstructor //creates constructor with no parameters
@AllArgsConstructor //creates constructor with all fields as parameters
public class doctors {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctorId;
    private String name;
    private String qualification;
    private int exp;
    private double fees;
    private String avai;
    private String city;

    @ManyToOne //many doctors may belong to one hospital
    @JoinColumn(name = "hosp_id") //creates a column for foreign key of another table
    private Hospital hosp;

    @ManyToOne
    @JoinColumn(name="spec_id")
    private Specialization spec;

    @OneToMany(mappedBy = "doctor")
    private List<Review> reviews;
}
