package com.healthconnect.service.request;


import lombok.Data;

@Data
public class HospitalBedRequest {

    private Long hospitalId;
    private Long regularBeds;
    private Long icuBeds;
    private Long pediatricBeds;
    private Long maternityBeds;
    private Long birthingBeds;
    private Long orthopedicBeds;
    private Long homeCareBeds;
    private Long emergencyBeds;
}
