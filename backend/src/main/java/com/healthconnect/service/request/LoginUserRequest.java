package com.healthconnect.service.request;

import lombok.Data;

@Data
public class LoginUserRequest {

    private String emailId;
    private String password;

}
