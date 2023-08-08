package com.healthconnect.service.request;

import lombok.Data;

@Data
public class BedAvailabilityRequest {

    private Long hospitalId;
    private Long regularBedAvail;
    private Long icuBedAvail;
    private Long pediatricBedAvail;
    private Long maternityBedAvail;
    private Long birthingBedAvail;
    private Long orthopedicBedAvail;
    private Long homeCareBedAvail;
    private Long emergencyBedAvail;


}
