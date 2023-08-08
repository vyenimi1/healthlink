package com.healthconnect.service.request;

import lombok.Data;

@Data
public class HospitalAccountRequest {

    private String password;
    private String name;
    private String street;
    private Long zipCode;
    private String city;
    private String state;
    private String contactNumber;
    private String email;
    private String website;
    private String labFacility;
    private String insuranceAcceptance;
    private String scanningFacility;
}
