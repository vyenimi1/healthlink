package com.healthconnect.service.controller;


import com.healthconnect.service.entity.DoctorDetails;
import com.healthconnect.service.entity.GeneralPublicUser;
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
import com.healthconnect.service.services.HospitalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/service")
@RequiredArgsConstructor
@Validated
public class HospitalController {

        @Autowired
        private HospitalService hospitalService;


        @PostMapping("/login-user")
        public UserResponse loginRequest(@RequestBody LoginUserRequest loginUserRequest) {
                return hospitalService.getUserLoginData(loginUserRequest);
        }

        @PostMapping("/create-hospital-account")
        public HospitalResponse createHospitalAccount(@RequestBody HospitalAccountRequest hospitalAccountRequest){
                return hospitalService.createHospitalAccount(hospitalAccountRequest);
        }

        @PostMapping("/login-hospital")
        public HospitalResponse hospitalLoginRequest(@RequestBody HospitalAccountRequest hospitalAccountRequest){
                return hospitalService.getHospitalLoginData(hospitalAccountRequest);
        }

        @PostMapping("/create-user-account")
        public UserResponse createUserAccount(@RequestBody UserRequest userRequest){
                return hospitalService.createUserAccount(userRequest);
        }

        @PostMapping("/doctor")
        public DoctorResponse doctorAdd(@RequestBody DoctorRequest newDoctor){
            return  hospitalService.addDoctor(newDoctor);
        }

        @PutMapping("/doctor/{id}")
        public DoctorResponse updateDoctor(@RequestBody DoctorRequest updateDoctor, @PathVariable Long id) {
              return  hospitalService.updateDoctor(updateDoctor, id);
        }

        @DeleteMapping("/doctor/{id}")
        public String removeDoctor( @PathVariable Long id){
                return hospitalService.deleteDoctor(id);
        }

        @PutMapping("/available-beds")
        public BedAvailableResponse updateBeds(@RequestBody BedAvailabilityRequest updateBedsAvail){
                log.info(updateBedsAvail.toString());
               return hospitalService.updateBedsAvailability(updateBedsAvail);
        }

        @PutMapping("/beds")
        public BedResponse updateBeds(@RequestBody HospitalBedRequest updateBeds){
                log.info(updateBeds.toString());
                return hospitalService.updateBeds(updateBeds);
        }


        @PutMapping("/hospital/{id}")
        public HospitalResponse updateHospital(@RequestBody HospitalAccountRequest updateHospitalAccount, @PathVariable Long id) {
             return   hospitalService.updateHospitalAccount(updateHospitalAccount,id);
        }

        @GetMapping("/get-hospital-list")
        public List<HospitalResponse> getListOfHospital(){
                return hospitalService.getListOfHospital();
        }

        @GetMapping("/get-doctor-list/{hospitalId}")
        public List<DoctorResponse> getListOfDoctor(@Valid @PathVariable Long hospitalId){
                return hospitalService.getListOfDoctor(hospitalId);
        }

        @GetMapping("/get-hospital/{hospitalId}")
        public AllHospitalResponse getAllHospitalDetails(@PathVariable Long hospitalId){
                return hospitalService.constructAllHospitalResponse(hospitalId);
        }

        @GetMapping("/get-hospital-details/{hospitalId}")
        public HospitalResponse getHospitalDetails(@PathVariable Long hospitalId){
                return hospitalService.constructHospitalResponse(hospitalId);
        }

        @GetMapping("/get-hospital-bed/{hospitalId}")
        public BedResponse getHospitalBed(@PathVariable Long hospitalId){
                return hospitalService.constructBedResponse(hospitalId);
        }

        @GetMapping("/get-hospital-bed-avail/{hospitalId}")
        public BedAvailableResponse getHospitalBedAvail(@PathVariable Long hospitalId){
                return hospitalService.constructBedAvailableResponse(hospitalId);
        }

        @PutMapping("/update-user/{userId}")
        public UserResponse updateUser(@RequestBody UserRequest userRequest, @PathVariable Long userId){
                return hospitalService.updateUser(userRequest,userId);
        }

        @GetMapping("/get-user/{userId}")
        public UserResponse getUserById(@PathVariable Long userId){
                return hospitalService.getUserById(userId);
        }
}
