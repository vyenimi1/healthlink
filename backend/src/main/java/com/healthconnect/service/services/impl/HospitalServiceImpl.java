package com.healthconnect.service.services.impl;

import com.healthconnect.service.entity.DoctorDetails;
import com.healthconnect.service.entity.GeneralPublicUser;
import com.healthconnect.service.entity.HospitalAccount;
import com.healthconnect.service.entity.HospitalBeds;
import com.healthconnect.service.entity.HospitalBedsAvailable;
import com.healthconnect.service.exception.InvalidUserLoginAccessException;
import com.healthconnect.service.repository.BedsOfHospitalRepository;
import com.healthconnect.service.repository.DoctorDetailsRepository;
import com.healthconnect.service.repository.HospitalBedsAvailabilityRepository;
import com.healthconnect.service.repository.HospitalRepository;
import com.healthconnect.service.repository.UserRepository;
import com.healthconnect.service.request.HospitalAccountRequest;
import com.healthconnect.service.request.LoginUserRequest;
import com.healthconnect.service.request.UserRequest;
import com.healthconnect.service.response.DoctorResponse;
import com.healthconnect.service.response.HospitalResponse;
import com.healthconnect.service.response.UserResponse;
import com.healthconnect.service.services.HospitalService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
public class HospitalServiceImpl implements HospitalService {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BedsOfHospitalRepository bedsOfHospitalRepository;

    @Autowired
    private DoctorDetailsRepository doctorDetailsRepository;

    @Autowired
    private HospitalBedsAvailabilityRepository hospitalBedsAvailabilityRepository;

    @Autowired
    private HospitalRepository hospitalRepository;


    @Override
    public UserResponse getUserLoginData(LoginUserRequest loginUserRequest) {

        Optional<GeneralPublicUser> generalPublicUser = userRepository.findByEmailIdAndPassword(loginUserRequest.getEmailId(), loginUserRequest.getPassword());

        UserResponse userResponse = new UserResponse();

        if(generalPublicUser.isEmpty()){
            throw new InvalidUserLoginAccessException("no user is present with this email an password");
        }

        if(generalPublicUser.isPresent()){
            GeneralPublicUser generalPublicUserEntity = generalPublicUser.get();
            userResponse.setUserId(generalPublicUserEntity.getUserId());
            userResponse.setEmailId(generalPublicUserEntity.getEmailId());
            userResponse.setFirstName(generalPublicUserEntity.getFirstName());
            userResponse.setMiddleName(generalPublicUserEntity.getMiddleName());
            userResponse.setLastName(generalPublicUserEntity.getLastName());
            userResponse.setContactNumber(generalPublicUserEntity.getContactNumber());
            userResponse.setStreetName(generalPublicUserEntity.getStreetName());
            userResponse.setCity(generalPublicUserEntity.getCity());
            userResponse.setZipCode(generalPublicUserEntity.getZipCode());
            userResponse.setState(generalPublicUserEntity.getState());
            userResponse.setEmergencyContactName(generalPublicUserEntity.getEmergencyContactName());
            userResponse.setEmergencyContactNumber(generalPublicUserEntity.getEmergencyContactNumber());
            userResponse.setUserCreatedData(generalPublicUserEntity.getUserCreatedData());
        }

        return userResponse;
    }

    @Override
    public HospitalResponse createHospitalAccount(HospitalAccountRequest hospitalAccountRequest) {

        HospitalAccount hospitalAccount = new HospitalAccount();
        hospitalAccount.setPassword(hospitalAccountRequest.getPassword());
        hospitalAccount.setName(hospitalAccountRequest.getName());
        hospitalAccount.setStreet(hospitalAccountRequest.getStreet());
        hospitalAccount.setZipCode(hospitalAccountRequest.getZipCode());
        hospitalAccount.setCity(hospitalAccountRequest.getCity());
        hospitalAccount.setState(hospitalAccountRequest.getState());
        hospitalAccount.setContactNumber(hospitalAccountRequest.getContactNumber());
        hospitalAccount.setEmail(hospitalAccountRequest.getEmail());
        hospitalAccount.setWebsite(hospitalAccountRequest.getWebsite());
        hospitalAccount.setLabFacility(hospitalAccountRequest.getLabFacility());
        hospitalAccount.setInsuranceAcceptance(hospitalAccountRequest.getInsuranceAcceptance());
        hospitalAccount.setScanningFacility(hospitalAccountRequest.getScanningFacility());

        HospitalAccount hospitalEntity = hospitalRepository.saveAndFlush(hospitalAccount);

        HospitalBeds hospitalBeds = new HospitalBeds();
        hospitalBeds.setHospitalId(hospitalEntity.getHospitalId());
        bedsOfHospitalRepository.saveAndFlush(hospitalBeds);

        HospitalBedsAvailable hospitalBedsAvailable = new HospitalBedsAvailable();
        hospitalBedsAvailable.setHospitalId(hospitalEntity.getHospitalId());
        hospitalBedsAvailabilityRepository.saveAndFlush(hospitalBedsAvailable);

        HospitalResponse hospitalResponse = constructHospitalResponse(hospitalEntity.getHospitalId());

        return hospitalResponse;

    }

    @Override
    public HospitalResponse getHospitalLoginData(HospitalAccountRequest hospitalAccountRequest) {

        Optional<HospitalAccount> hospitalAccount = hospitalRepository.findByEmailAndPassword(hospitalAccountRequest.getEmail(), hospitalAccountRequest.getPassword());

        if(hospitalAccount.isEmpty()){
            throw new InvalidUserLoginAccessException("no hospital is present with this email an password");
        }

        if(hospitalAccount.isPresent()){
            HospitalAccount hospitalAccountEntity = hospitalAccount.get();
            return constructHospitalResponse(hospitalAccountEntity.getHospitalId());

        }
        return null;
    }

    @Override
    public UserResponse createUserAccount(UserRequest userRequest) {
        GeneralPublicUser generalPublicUser = new GeneralPublicUser();

        generalPublicUser.setPassword(userRequest.getPassword());
        generalPublicUser.setEmailId(userRequest.getEmailId());
        generalPublicUser.setFirstName(userRequest.getFirstName());
        generalPublicUser.setMiddleName(userRequest.getMiddleName());
        generalPublicUser.setLastName(userRequest.getLastName());
        generalPublicUser.setContactNumber(userRequest.getContactNumber());
        generalPublicUser.setStreetName(userRequest.getStreetName());
        generalPublicUser.setCity(userRequest.getCity());
        generalPublicUser.setZipCode(userRequest.getZipCode());
        generalPublicUser.setState(userRequest.getState());
        generalPublicUser.setEmergencyContactName(userRequest.getEmergencyContactName());
        generalPublicUser.setEmergencyContactNumber(userRequest.getEmergencyContactNumber());
        generalPublicUser.setUserCreatedData(userRequest.getUserCreatedData());

        GeneralPublicUser generalPublicUserEntity = userRepository.saveAndFlush(generalPublicUser);

        return constructUserResponse(generalPublicUserEntity.getEmailId());

    }

    @Override
    public List<HospitalResponse> getListOfHospital() {

        List<HospitalAccount> hospitalAccounts = hospitalRepository.findAll();

        List<HospitalResponse> hospitalResponses = new ArrayList<>();

        for (HospitalAccount hospitalAccount : hospitalAccounts) {
            hospitalResponses.add(constructHospitalResponse(hospitalAccount.getHospitalId()));
        }

        return hospitalResponses;

    }

    @Override
    public List<DoctorResponse> getListOfDoctor(Long hospitalId) {
        List<DoctorDetails> doctorDetailsList = doctorDetailsRepository.findAllByHospitalId(hospitalId);

        List<DoctorResponse> doctorResponseList = new ArrayList<>();

        for( DoctorDetails doctorDetails : doctorDetailsList){
            doctorResponseList.add(constructDoctorResponse(doctorDetails.getDoctorId()));
        }

        return doctorResponseList;
    }


    public HospitalResponse constructHospitalResponse(Long hospitalId){
        HospitalAccount hospitalAccount = hospitalRepository.findByHospitalId(hospitalId);

        HospitalResponse hospitalResponse = new HospitalResponse();
        hospitalResponse.setHospitalId(hospitalAccount.getHospitalId());
        hospitalResponse.setName(hospitalAccount.getName());
        hospitalResponse.setStreet(hospitalAccount.getStreet());
        hospitalResponse.setZipCode(hospitalAccount.getZipCode());
        hospitalResponse.setCity(hospitalAccount.getCity());
        hospitalResponse.setState(hospitalAccount.getState());
        hospitalResponse.setContactNumber(hospitalAccount.getContactNumber());
        hospitalResponse.setEmail(hospitalAccount.getEmail());
        hospitalResponse.setWebsite(hospitalAccount.getWebsite());
        hospitalResponse.setLabFacility(hospitalAccount.getLabFacility());
        hospitalResponse.setInsuranceAcceptance(hospitalAccount.getInsuranceAcceptance());
        hospitalResponse.setScanningFacility(hospitalAccount.getScanningFacility());

        return hospitalResponse;
    }

    public UserResponse constructUserResponse(String emailId){
        GeneralPublicUser generalPublicUserEntity = userRepository.findByEmailId(emailId);
        UserResponse userResponse = new UserResponse();
        userResponse.setUserId(generalPublicUserEntity.getUserId());
        userResponse.setEmailId(generalPublicUserEntity.getEmailId());
        userResponse.setFirstName(generalPublicUserEntity.getFirstName());
        userResponse.setMiddleName(generalPublicUserEntity.getMiddleName());
        userResponse.setLastName(generalPublicUserEntity.getLastName());
        userResponse.setContactNumber(generalPublicUserEntity.getContactNumber());
        userResponse.setStreetName(generalPublicUserEntity.getStreetName());
        userResponse.setCity(generalPublicUserEntity.getCity());
        userResponse.setZipCode(generalPublicUserEntity.getZipCode());
        userResponse.setState(generalPublicUserEntity.getState());
        userResponse.setEmergencyContactName(generalPublicUserEntity.getEmergencyContactName());
        userResponse.setEmergencyContactNumber(generalPublicUserEntity.getEmergencyContactNumber());
        userResponse.setUserCreatedData(generalPublicUserEntity.getUserCreatedData());

        return userResponse;

    }

    public DoctorResponse constructDoctorResponse(Long doctorId){

        DoctorDetails doctorEntity = doctorDetailsRepository.getById(doctorId);

        DoctorResponse doctorResponse = new DoctorResponse();

        doctorResponse.setDoctorId(doctorEntity.getDoctorId());
        doctorResponse.setHospitalId(doctorEntity.getHospitalId());
        doctorResponse.setFirstName(doctorEntity.getFirstName());
        doctorResponse.setLastName(doctorEntity.getLastName());
        doctorResponse.setGender(doctorEntity.getGender());
        doctorResponse.setAge(doctorEntity.getAge());
        doctorResponse.setSpecialization(doctorEntity.getSpecialization());
        doctorResponse.setContactNumber(doctorEntity.getContactNumber());
        doctorResponse.setEmailAddress(doctorEntity.getEmailAddress());
        doctorResponse.setYearsOfExperience(doctorEntity.getYearsOfExperience());
        doctorResponse.setLanguagesKnown(doctorEntity.getLanguagesKnown());
        doctorResponse.setConsultationHours(doctorEntity.getConsultationHours());
        doctorResponse.setAvailabilityDays(doctorEntity.getAvailabilityDays());

        return doctorResponse;
    }






}
