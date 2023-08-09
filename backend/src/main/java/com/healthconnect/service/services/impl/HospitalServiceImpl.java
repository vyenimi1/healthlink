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
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

        Optional<GeneralPublicUser> generalPublicUser = userRepository.findByEmailIdAndPassword(loginUserRequest.getEmail(), loginUserRequest.getPassword());

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
        hospitalBeds.setIcuBeds(0L);
        hospitalBeds.setEmergencyBeds(0L);
        hospitalBeds.setPediatricBeds(0L);
        hospitalBeds.setRegularBeds(0L);
        hospitalBeds.setMaternityBeds(0L);
        hospitalBeds.setBirthingBeds(0L);
        hospitalBeds.setOrthopedicBeds(0L);
        hospitalBeds.setHomecareBeds(0L);
        bedsOfHospitalRepository.saveAndFlush(hospitalBeds);

        HospitalBedsAvailable hospitalBedsAvailable = new HospitalBedsAvailable();
        hospitalBedsAvailable.setHospitalId(hospitalEntity.getHospitalId());
        hospitalBedsAvailable.setIcuBedsAvail(0L);
        hospitalBedsAvailable.setEmergencyBedsAvail(0L);
        hospitalBedsAvailable.setPediatricBedsAvail(0L);
        hospitalBedsAvailable.setRegularBedsAvail(0L);
        hospitalBedsAvailable.setMaternityBedsAvail(0L);
        hospitalBedsAvailable.setBirthingBedsAvail(0L);
        hospitalBedsAvailable.setOrthopedicBedsAvail(0L);
        hospitalBedsAvailable.setHomecareBedsAvail(0L);
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
        generalPublicUser.setUserCreatedData(LocalDateTime.now());

        GeneralPublicUser generalPublicUserEntity = userRepository.saveAndFlush(generalPublicUser);

        return constructUserResponse(generalPublicUserEntity.getEmailId());

    }

    public DoctorResponse  addDoctor(DoctorRequest doctorRequest){
        DoctorDetails doctorDetails = new DoctorDetails();
        doctorDetails.setHospitalId(doctorRequest.getHospitalId());
        doctorDetails.setFirstName(doctorRequest.getFirstName());
        doctorDetails.setLastName(doctorRequest.getLastName());
        doctorDetails.setGender(doctorRequest.getGender());
        doctorDetails.setAge(doctorRequest.getAge());
        doctorDetails.setSpecialization(doctorRequest.getSpecialization());
        doctorDetails.setContactNumber(doctorRequest.getContactNumber());
        doctorDetails.setEmailAddress(doctorRequest.getEmailAddress());
        doctorDetails.setYearsOfExperience(doctorRequest.getYearsOfExperience());
        doctorDetails.setLanguagesKnown(doctorRequest.getLanguagesKnown());
        doctorDetails.setConsultationHours(doctorRequest.getConsultationHours());
        doctorDetails.setAvailabilityDays(doctorRequest.getAvailabilityDays());

        DoctorDetails docEntity = doctorDetailsRepository.saveAndFlush(doctorDetails);

        return constructDoctorResponse(docEntity.getDoctorId());

    }


    public DoctorResponse updateDoctor(DoctorRequest updateDoctor,Long id){
        DoctorDetails doctorDetails = doctorDetailsRepository.findByDoctorId(id);
        doctorDetails.setHospitalId(updateDoctor.getHospitalId());
        doctorDetails.setFirstName(updateDoctor.getFirstName());
        doctorDetails.setLastName(updateDoctor.getLastName());
        doctorDetails.setGender(updateDoctor.getGender());
        doctorDetails.setAge(updateDoctor.getAge());
        doctorDetails.setSpecialization(updateDoctor.getSpecialization());
        doctorDetails.setContactNumber(updateDoctor.getContactNumber());
        doctorDetails.setEmailAddress(updateDoctor.getEmailAddress());
        doctorDetails.setYearsOfExperience(updateDoctor.getYearsOfExperience());
        doctorDetails.setLanguagesKnown(updateDoctor.getLanguagesKnown());
        doctorDetails.setConsultationHours(updateDoctor.getConsultationHours());
        doctorDetails.setAvailabilityDays(updateDoctor.getAvailabilityDays());

        DoctorDetails docEntity = doctorDetailsRepository.saveAndFlush(doctorDetails);

        return constructDoctorResponse(docEntity.getDoctorId());
    }

    public String deleteDoctor(Long id){
        doctorDetailsRepository.deleteById(id);
        return "SUCCESSFULLY DELETED THE DOCTOR";
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
        hospitalResponse.setPassword(hospitalResponse.getPassword());
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
        userResponse.setPassword(generalPublicUserEntity.getPassword());
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



    public BedAvailableResponse updateBedsAvailability(BedAvailabilityRequest bedAvailabilityRequest){

            HospitalBedsAvailable hospitalBedsAvailable = hospitalBedsAvailabilityRepository.findByHospitalId(bedAvailabilityRequest.getHospitalId());

            hospitalBedsAvailable.setHospitalId(bedAvailabilityRequest.getHospitalId());
            hospitalBedsAvailable.setRegularBedsAvail(bedAvailabilityRequest.getRegularBedAvail());
            hospitalBedsAvailable.setIcuBedsAvail(bedAvailabilityRequest.getIcuBedAvail());
            hospitalBedsAvailable.setPediatricBedsAvail(bedAvailabilityRequest.getPediatricBedAvail());
            hospitalBedsAvailable.setMaternityBedsAvail(bedAvailabilityRequest.getMaternityBedAvail());
            hospitalBedsAvailable.setBirthingBedsAvail(bedAvailabilityRequest.getBirthingBedAvail());
            hospitalBedsAvailable.setOrthopedicBedsAvail(bedAvailabilityRequest.getOrthopedicBedAvail());
            hospitalBedsAvailable.setHomecareBedsAvail(bedAvailabilityRequest.getHomeCareBedAvail());
            hospitalBedsAvailable.setEmergencyBedsAvail(bedAvailabilityRequest.getEmergencyBedAvail());

            HospitalBedsAvailable hospitalBedsAvailableEntity = hospitalBedsAvailabilityRepository.saveAndFlush(hospitalBedsAvailable);

            return constructBedAvailableResponse(hospitalBedsAvailableEntity.getHospitalId());
        }

    public HospitalResponse updateHospitalAccount(HospitalAccountRequest updateHospitalAccount,Long hospitalId){
        HospitalAccount hospitalAccount = hospitalRepository.findByHospitalId(hospitalId);

        hospitalAccount.setPassword(updateHospitalAccount.getPassword());
        hospitalAccount.setName(updateHospitalAccount.getName());
        hospitalAccount.setStreet(updateHospitalAccount.getStreet());
        hospitalAccount.setZipCode(updateHospitalAccount.getZipCode());
        hospitalAccount.setCity(updateHospitalAccount.getCity());
        hospitalAccount.setState(updateHospitalAccount.getState());
        hospitalAccount.setContactNumber(updateHospitalAccount.getContactNumber());
        hospitalAccount.setEmail(updateHospitalAccount.getEmail());
        hospitalAccount.setWebsite(updateHospitalAccount.getWebsite());
        hospitalAccount.setLabFacility(updateHospitalAccount.getLabFacility());
        hospitalAccount.setInsuranceAcceptance(updateHospitalAccount.getInsuranceAcceptance());
        hospitalAccount.setScanningFacility(updateHospitalAccount.getScanningFacility());

        HospitalAccount hosEntity = hospitalRepository.saveAndFlush(hospitalAccount);

        return constructHospitalResponse(hosEntity.getHospitalId());
    }
    public BedResponse updateBeds(HospitalBedRequest updateBeds){
        HospitalBeds hospitalBeds= bedsOfHospitalRepository.findByHospitalId(updateBeds.getHospitalId());

        hospitalBeds.setHospitalId(updateBeds.getHospitalId());
        hospitalBeds.setRegularBeds(updateBeds.getRegularBeds());
        hospitalBeds.setIcuBeds(updateBeds.getIcuBeds());
        hospitalBeds.setPediatricBeds(updateBeds.getPediatricBeds());
        hospitalBeds.setMaternityBeds(updateBeds.getMaternityBeds());
        hospitalBeds.setBirthingBeds(updateBeds.getBirthingBeds());
        hospitalBeds.setOrthopedicBeds(updateBeds.getOrthopedicBeds());
        hospitalBeds.setHomecareBeds(updateBeds.getHomeCareBeds());
        hospitalBeds.setEmergencyBeds(updateBeds.getEmergencyBeds());

        HospitalBeds hospitalBedsEntity = bedsOfHospitalRepository.saveAndFlush(hospitalBeds);
        return constructBedResponse(hospitalBedsEntity.getHospitalId());
    }

    public BedResponse constructBedResponse(Long hospitalId) {
        HospitalBeds hospitalBedsEntity = bedsOfHospitalRepository.findByHospitalId(hospitalId);

        BedResponse response = new BedResponse();
        response.setSerialNum(hospitalBedsEntity.getSerialNum());
        response.setHospitalId(hospitalBedsEntity.getHospitalId());
        response.setRegularBeds(hospitalBedsEntity.getRegularBeds());
        response.setIcuBeds(hospitalBedsEntity.getIcuBeds());
        response.setPediatricBeds(hospitalBedsEntity.getPediatricBeds());
        response.setMaternityBeds(hospitalBedsEntity.getMaternityBeds());
        response.setBirthingBeds(hospitalBedsEntity.getBirthingBeds());
        response.setOrthopedicBeds(hospitalBedsEntity.getOrthopedicBeds());
        response.setHomecareBeds(hospitalBedsEntity.getHomecareBeds());
        response.setEmergencyBeds(hospitalBedsEntity.getEmergencyBeds());

        return response;
    }

    @Override
    public UserResponse updateUser(UserRequest userRequest, Long userId) {

        GeneralPublicUser generalPublicUser = userRepository.findByUserId(userId);

        generalPublicUser.setFirstName(userRequest.getFirstName());
        generalPublicUser.setMiddleName(userRequest.getMiddleName());
        generalPublicUser.setLastName(userRequest.getLastName());
        generalPublicUser.setPassword(userRequest.getPassword());
        generalPublicUser.setContactNumber(userRequest.getContactNumber());
        generalPublicUser.setEmailId(userRequest.getEmailId());
        generalPublicUser.setCity(userRequest.getCity());
        generalPublicUser.setStreetName(userRequest.getStreetName());
        generalPublicUser.setZipCode(userRequest.getZipCode());
        generalPublicUser.setEmergencyContactName(userRequest.getEmergencyContactName());
        generalPublicUser.setEmergencyContactNumber(userRequest.getEmergencyContactNumber());
        generalPublicUser.setState(userRequest.getState());

        GeneralPublicUser generalPublicUserEntity = userRepository.saveAndFlush(generalPublicUser);

        return constructUserResponse(generalPublicUserEntity.getEmailId());

    }

    public BedAvailableResponse constructBedAvailableResponse(Long hospitalId) {
        HospitalBedsAvailable hospitalBedsEntity = hospitalBedsAvailabilityRepository.findByHospitalId(hospitalId);

        BedAvailableResponse response = new BedAvailableResponse();
        response.setSerialNum(hospitalBedsEntity.getSerialNum());
        response.setHospitalId(hospitalBedsEntity.getHospitalId());
        response.setRegularBedsAvail(hospitalBedsEntity.getRegularBedsAvail());
        response.setIcuBedsAvail(hospitalBedsEntity.getIcuBedsAvail());
        response.setPediatricBedsAvail(hospitalBedsEntity.getPediatricBedsAvail());
        response.setMaternityBedsAvail(hospitalBedsEntity.getMaternityBedsAvail());
        response.setBirthingBedsAvail(hospitalBedsEntity.getBirthingBedsAvail());
        response.setOrthopedicBedsAvail(hospitalBedsEntity.getOrthopedicBedsAvail());
        response.setHomecareBedsAvail(hospitalBedsEntity.getHomecareBedsAvail());
        response.setEmergencyBedsAvail(hospitalBedsEntity.getEmergencyBedsAvail());

        return response;
    }

    public AllHospitalResponse constructAllHospitalResponse(Long hospitalId){

        AllHospitalResponse allHospitalResponse = new AllHospitalResponse();

        allHospitalResponse.setHospitalResponse(constructHospitalResponse(hospitalId));
        allHospitalResponse.setBedResponse(constructBedResponse(hospitalId));
        allHospitalResponse.setBedAvailableResponse(constructBedAvailableResponse(hospitalId));
        allHospitalResponse.setDoctorResponseList(getListOfDoctor(hospitalId));

        return allHospitalResponse;
    }


    public UserResponse getUserById(Long userId){
        GeneralPublicUser generalPublicUserEntity = userRepository.findByUserId(userId);
        UserResponse userResponse = new UserResponse();
        userResponse.setUserId(generalPublicUserEntity.getUserId());
        userResponse.setPassword(generalPublicUserEntity.getPassword());
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
}
