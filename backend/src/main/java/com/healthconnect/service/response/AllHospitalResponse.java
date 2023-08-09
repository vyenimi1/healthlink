package com.healthconnect.service.response;


import lombok.Data;

import java.util.List;

@Data
public class AllHospitalResponse {

    private HospitalResponse hospitalResponse;
    private BedResponse bedResponse;
    private BedAvailableResponse bedAvailableResponse;
    private List<DoctorResponse> doctorResponseList;
}
