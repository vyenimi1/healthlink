package com.healthconnect.service.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "hospital_account")
@Entity
@Data
public class HospitalAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "h_id")
    private Long hospitalId;

    @Column(name = "h_password")
    private String password;

    @Column(name = "h_name")
    private String name;

    @Column(name = "h_street")
    private String street;

    @Column(name = "h_zip_code")
    private Long zipCode;

    @Column(name = "h_city")
    private String city;

    @Column(name = "h_state")
    private String state;

    @Column(name = "h_contact_number")
    private String contactNumber;

    @Column(name = "h_email")
    private String email;

    @Column(name = "h_website")
    private String website;

    @Column(name = "h_lab_facility")
    private String labFacility;

    @Column(name = "h_insurance_acceptance")
    private String insuranceAcceptance;

    @Column(name = "h_scanning_facility")
    private String scanningFacility;


}
