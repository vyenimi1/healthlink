package com.healthconnect.service.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="doctor_details")
@Entity
@Data
@Getter
@Setter
public class DoctorDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctor_id")
    private Long doctorId;

    @Column(name = "h_id")
    private Long hospitalId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "gender")
    private String gender;

    @Column(name = "age")
    private Long age;

    @Column(name = "specialization")
    private String specialization;

    @Column(name = "contact_number")
    private String contactNumber;

    @Column(name = "email_address")
    private String emailAddress;

    @Column(name = "years_of_experience")
    private Long yearsOfExperience;

    @Column(name = "languages_known")
    private String languagesKnown;

    @Column(name = "consultation_hours")
    private String consultationHours;

    @Column(name = "availability_days")
    private String availabilityDays;


}

