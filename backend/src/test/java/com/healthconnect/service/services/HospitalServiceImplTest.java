package com.healthconnect.service.services;

import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.healthconnect.service.entity.*;
import com.healthconnect.service.repository.*;
import com.healthconnect.service.request.*;
import com.healthconnect.service.response.*;
import com.healthconnect.service.services.impl.HospitalServiceImpl;

import static org.junit.jupiter.api.Assertions.*;

class HospitalServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BedsOfHospitalRepository bedsOfHospitalRepository;

    @Mock
    private DoctorDetailsRepository doctorDetailsRepository;

    @Mock
    private HospitalBedsAvailabilityRepository hospitalBedsAvailabilityRepository;

    @Mock
    private HospitalRepository hospitalRepository;

    @InjectMocks
    private HospitalServiceImpl hospitalService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetUserLoginData_ValidUser() {
        // Create a test GeneralPublicUser
        GeneralPublicUser testUser = new GeneralPublicUser();
        testUser.setEmailId("user1@email.com");
        testUser.setPassword("password123");
        testUser.setUserId(1L);
        testUser.setCity("Cityville");
        testUser.setLastName("Doe");
        testUser.setFirstName("John");
        testUser.setContactNumber("1234567890");
        testUser.setStreetName("123 Main St");
        testUser.setZipCode(12345L);
        testUser.setState("Stateville");
        testUser.setEmergencyContactName("Jane Doe");
        testUser.setEmergencyContactNumber("1876543210");

        when(userRepository.findByEmailIdAndPassword("user1@email.com", "password123"))
                .thenReturn(Optional.of(testUser));

        LoginUserRequest request = new LoginUserRequest();
        request.setEmail("user1@email.com");
        request.setPassword("password123");

        UserResponse response = hospitalService.getUserLoginData(request);

        assertNotNull(response);
        assertEquals("user1@email.com", response.getEmailId());
        assertEquals(1L, response.getUserId());
        assertEquals("Cityville", response.getCity());
        assertEquals("Doe", response.getLastName());
        assertEquals("John", response.getFirstName());
        assertEquals("1234567890", response.getContactNumber());
        assertEquals("123 Main St", response.getStreetName());
        assertEquals(12345L,response.getZipCode());
        assertEquals("Stateville", response.getState());
        assertEquals("Jane Doe", response.getEmergencyContactName());
        assertEquals("1876543210", response.getEmergencyContactNumber());
    }


   /* @Test
    void testCreateHospitalAccount() {
        // Create a test HospitalAccountRequest
        HospitalAccountRequest request = new HospitalAccountRequest();
        request.setPassword("password123");
        request.setName("Test Hospital");
        request.setStreet("123 Main St");
        request.setZipCode(12345L);
        request.setCity("Cityville");
        request.setState("Stateville");
        request.setContactNumber("1234567890");
        request.setEmail("hospital@example.com");
        request.setWebsite("www.testhospital.com");
        request.setLabFacility("Available");
        request.setInsuranceAcceptance("Accepted");
        request.setScanningFacility("Available");

        // Create a test HospitalAccount
        HospitalAccount testHospitalAccount = new HospitalAccount();
        testHospitalAccount.setHospitalId(1L); // Assuming hospital ID generated after save
        testHospitalAccount.setPassword("password123");
        testHospitalAccount.setName("Test Hospital");
        testHospitalAccount.setStreet("123 Main St");
        testHospitalAccount.setZipCode(12345L);
        testHospitalAccount.setCity("Cityville");
        testHospitalAccount.setState("Stateville");
        testHospitalAccount.setContactNumber("1234567890");
        testHospitalAccount.setEmail("hospital@example.com");
        testHospitalAccount.setWebsite("www.testhospital.com");
        testHospitalAccount.setLabFacility("Available");
        testHospitalAccount.setInsuranceAcceptance("Accepted");
        testHospitalAccount.setScanningFacility("Available");

        // Mock repository and service behavior
        when(hospitalRepository.saveAndFlush(any(HospitalAccount.class))).thenReturn(testHospitalAccount);
        //when(hospitalEntity.getHospitalId()).thenReturn(1L); // Assuming hospital ID generated after save

        // Call the method
        HospitalResponse response = hospitalService.createHospitalAccount(request);

        // Assertions
        assertNotNull(response);
        assertEquals("Test Hospital", response.getName());
        assertEquals("123 Main St", response.getStreet());
        assertEquals(12345L, response.getZipCode());
        assertEquals("Cityville", response.getCity());
        assertEquals("Stateville", response.getState());
        assertEquals("1234567890", response.getContactNumber());
        assertEquals("hospital@example.com", response.getEmail());
        assertEquals("www.testhospital.com", response.getWebsite());
        assertEquals("Available", response.getLabFacility());
        assertEquals("Accepted", response.getInsuranceAcceptance());
        assertEquals("Available", response.getScanningFacility());
        // Add more assertions for other properties...
    }
*/

    @Test
    void testConstructHospitalResponse() {
        HospitalAccount hospitalAccount = new HospitalAccount();
        hospitalAccount.setHospitalId(2L);
        hospitalAccount.setName("Another Hospital");
        hospitalAccount.setCity("Townville");
        hospitalAccount.setEmail("another@email.com");
        hospitalAccount.setStreet("456 Elm St");
        hospitalAccount.setZipCode(67890L);
        hospitalAccount.setState("Stateville");
        hospitalAccount.setContactNumber("12467890");

        when(hospitalRepository.findByHospitalId(2L)).thenReturn(hospitalAccount);

        HospitalResponse hospitalResponse = hospitalService.constructHospitalResponse(1L);

        assertNotNull(hospitalResponse);
        assertEquals(2L, hospitalResponse.getHospitalId());
        assertEquals("Another Hospital", hospitalResponse.getName());
        assertEquals("Townville", hospitalResponse.getCity());
        assertEquals("another@email.com", hospitalResponse.getEmail());
        assertEquals("456 Elm St",hospitalResponse.getStreet());
        assertEquals(67890L,hospitalResponse.getZipCode());
        assertEquals("Stateville",hospitalResponse.getState());
        assertEquals("12467890", hospitalResponse.getContactNumber());
    }

    @Test
    void testConstructUserResponse() {
        GeneralPublicUser generalPublicUser = new GeneralPublicUser();
        generalPublicUser.setEmailId("user1@email.com");
        generalPublicUser.setPassword("password123"); // Set password
        generalPublicUser.setFirstName("John"); // Set first name
        generalPublicUser.setLastName("Doe"); // Set last name
        generalPublicUser.setContactNumber("1234567890"); // Set contact number
        generalPublicUser.setStreetName("123 Main St"); // Set street name
        generalPublicUser.setCity("Cityville"); // Set city
        generalPublicUser.setZipCode(12345L); // Set zip code
        generalPublicUser.setState("Stateville"); // Set state
        generalPublicUser.setEmergencyContactName("Jane Doe"); // Set emergency contact name
        generalPublicUser.setEmergencyContactNumber("1876543210"); // Set emergency contact number
        // Set other properties...

        when(userRepository.findByEmailId("user1@email.com")).thenReturn(generalPublicUser);

        UserResponse userResponse = hospitalService.constructUserResponse("test@example.com");

        assertNotNull(userResponse);
        assertEquals("user1@email.com", userResponse.getEmailId());
        assertEquals("John", userResponse.getFirstName());
        assertEquals("Middle", userResponse.getMiddleName());
        assertEquals("Doe", userResponse.getLastName());
        assertEquals("1234567890", userResponse.getContactNumber());
        assertEquals("123 Main St", userResponse.getStreetName());
        assertEquals("Cityville", userResponse.getCity());
        assertEquals(12345L, userResponse.getZipCode());
        assertEquals("Stateville", userResponse.getState());
        assertEquals("Jane Doe", userResponse.getEmergencyContactName());
        assertEquals("1876543210", userResponse.getEmergencyContactNumber());
        // Add more assertions for other properties...

    }

    @Test
    void testConstructDoctorResponse() {
        DoctorDetails doctorDetails = new DoctorDetails();
        doctorDetails.setDoctorId(1L);
        doctorDetails.setFirstName("John");
        doctorDetails.setLastName("Doe");
        doctorDetails.setGender("Male");
        doctorDetails.setAge(35L);
        doctorDetails.setSpecialization("Cardiology");
        doctorDetails.setContactNumber("12343");
        doctorDetails.setEmailAddress("john@email.com");
        doctorDetails.setYearsOfExperience(10L);
        doctorDetails.setLanguagesKnown("English, Spanish");
        doctorDetails.setConsultationHours("9 AM - 5 PM");
        doctorDetails.setAvailabilityDays("Mon, Wed, Fri");
        when(doctorDetailsRepository.getById(1L)).thenReturn(doctorDetails);

        DoctorResponse doctorResponse = hospitalService.constructDoctorResponse(1L);

        assertNotNull(doctorResponse);
        assertEquals(1L, doctorResponse.getDoctorId());
        assertEquals("John", doctorResponse.getFirstName());
        assertEquals("Doe", doctorResponse.getLastName());
        assertEquals("Male", doctorResponse.getGender());
        assertEquals(35L, doctorResponse.getAge());
        assertEquals("Cardiology", doctorResponse.getSpecialization());
        assertEquals("12343", doctorResponse.getContactNumber());
        assertEquals("john@email.com", doctorResponse.getEmailAddress());
        assertEquals(10L, doctorResponse.getYearsOfExperience());
        assertEquals("English, Spanish", doctorResponse.getLanguagesKnown());
        assertEquals("9 AM - 5 PM", doctorResponse.getConsultationHours());
        assertEquals("Mon, Wed, Fri", doctorResponse.getAvailabilityDays());
        assertEquals(123L, doctorResponse.getHospitalId());

    }

}

