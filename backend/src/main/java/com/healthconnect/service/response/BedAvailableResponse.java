package com.healthconnect.service.response;


import lombok.Data;

@Data
public class BedAvailableResponse {

    private Long serialNum;
    private Long hospitalId;
    private Long regularBedsAvail;
    private Long icuBedsAvail;
    private Long pediatricBedsAvail;
    private Long maternityBedsAvail;
    private Long birthingBedsAvail;
    private Long orthopedicBedsAvail;
    private Long homecareBedsAvail;
    private Long emergencyBedsAvail;
}
