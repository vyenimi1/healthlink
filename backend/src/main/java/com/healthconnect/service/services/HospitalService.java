package com.healthconnect.service.services;

import com.healthconnect.service.entity.DoctorDetails;
import com.healthconnect.service.entity.HospitalAccount;
import com.healthconnect.service.entity.HospitalBeds;
import com.healthconnect.service.entity.HospitalBedsAvailable;
import com.healthconnect.service.request.BedAvailabilityRequest;
import com.healthconnect.service.request.DoctorRequest;
import com.healthconnect.service.request.HospitalAccountRequest;
import com.healthconnect.service.request.HospitalBedRequest;
import com.healthconnect.service.request.LoginUserRequest;
import com.healthconnect.service.request.UserRequest;
import com.healthconnect.service.response.AllHospitalResponse;
import com.healthconnect.service.response.BedAvailableResponse;
import com.healthconnect.service.response.BedResponse;
import com.healthconnect.service.response.DoctorResponse;
import com.healthconnect.service.response.HospitalResponse;
import com.healthconnect.service.response.UserResponse;

import java.util.List;

public interface HospitalService {


    UserResponse getUserLoginData(LoginUserRequest loginUserRequest);


    HospitalResponse createHospitalAccount(HospitalAccountRequest hospitalAccountRequest);

    HospitalResponse getHospitalLoginData(HospitalAccountRequest hospitalAccountRequest);

    UserResponse createUserAccount(UserRequest userRequest);


    public DoctorResponse addDoctor(DoctorRequest newDoctor);

    public DoctorResponse updateDoctor(DoctorRequest updateDoctor,Long id);

    public String  deleteDoctor(Long id);

     public BedAvailableResponse updateBedsAvailability(BedAvailabilityRequest updateBedsAvail);

    public HospitalResponse updateHospitalAccount(HospitalAccountRequest updateHospitalAccount, Long hospitalId);


    List<HospitalResponse> getListOfHospital();

    List<DoctorResponse> getListOfDoctor(Long hospitalId);

    public BedResponse updateBeds(HospitalBedRequest updateBeds);

    public AllHospitalResponse constructAllHospitalResponse(Long hospitalId);

    public HospitalResponse constructHospitalResponse(Long hospitalId);

    public BedAvailableResponse constructBedAvailableResponse(Long hospitalId);

    public BedResponse constructBedResponse(Long hospitalId);

    public UserResponse updateUser(UserRequest userRequest, Long userId);

    public UserResponse getUserById(Long userId);

}
