package com.healthconnect.service.response;


import lombok.Data;

@Data
public class BedResponse {

    private Long serialNum;
    private Long hospitalId;
    private Long regularBeds;
    private Long icuBeds;
    private Long pediatricBeds;
    private Long maternityBeds;
    private Long birthingBeds;
    private Long orthopedicBeds;
    private Long homecareBeds;
    private Long emergencyBeds;
}
