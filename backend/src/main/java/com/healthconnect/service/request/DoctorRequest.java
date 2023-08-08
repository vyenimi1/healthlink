package com.healthconnect.service.request;


import lombok.Data;

@Data
public class DoctorRequest {

    private Long hospitalId;
    private String firstName;
    private String lastName;
    private String gender;
    private Long age;
    private String specialization;
    private String contactNumber;
    private String emailAddress;
    private Long yearsOfExperience;
    private String languagesKnown;
    private String consultationHours;
    private String availabilityDays;


}
