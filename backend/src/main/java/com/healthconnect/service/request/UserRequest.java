package com.healthconnect.service.request;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserRequest {

    private Long userId;
    private String password;
    private String emailId;
    private String firstName;
    private String middleName;
    private String lastName;
    private String contactNumber;
    private String streetName;
    private String city;
    private Long zipCode;
    private String state;
    private String emergencyContactName;
    private String emergencyContactNumber;
    private LocalDateTime userCreatedData;

}
