package tech.hospital.healthcare.model;

import jakarta.persistence.*;

import java.io.Serializable;
@Entity
public class GeneralPublicUser implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false,updatable = false)
    private long user_id;
    private String password;
    private String email_id;
    private String first_name;
    private String middle_name;
    private String last_name;
    private String contact_number;
    private String street_name;
    private String city;
    private String zip_code;
    private String state ;
    private String emergency_contact_name;
    private String emergency_contact_number;
    private String user_created_date;

    public GeneralPublicUser(){}
    public GeneralPublicUser(long userId, String password, String emailId, String firstName, String middleName, String lastName, String contactNumber, String streetName, String city, String zipCode, String state, String emergencyContactName, String emergencyContactNumber, String userCreatedDate) {
        this.user_id = userId;
        this.password = password;
        this.email_id = emailId;
        this.first_name = firstName;
        this.middle_name = middleName;
        this.last_name = lastName;
        this.contact_number = contactNumber;
        this.street_name = streetName;
        this.city = city;
        this.zip_code = zipCode;
        this.state = state;
        this.emergency_contact_name = emergencyContactName;
        this.emergency_contact_number = emergencyContactNumber;
        this.user_created_date = userCreatedDate;
    }

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail_id() {
        return email_id;
    }

    public void setEmail_id(String email_id) {
        this.email_id = email_id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getMiddle_name() {
        return middle_name;
    }

    public void setMiddle_name(String middle_name) {
        this.middle_name = middle_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getContact_number() {
        return contact_number;
    }

    public void setContact_number(String contact_number) {
        this.contact_number = contact_number;
    }

    public String getStreet_name() {
        return street_name;
    }

    public void setStreet_name(String street_name) {
        this.street_name = street_name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZip_code() {
        return zip_code;
    }

    public void setZip_code(String zip_code) {
        this.zip_code = zip_code;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getEmergency_contact_name() {
        return emergency_contact_name;
    }

    public void setEmergency_contact_name(String emergency_contact_name) {
        this.emergency_contact_name = emergency_contact_name;
    }

    public String getEmergency_contact_number() {
        return emergency_contact_number;
    }

    public void setEmergency_contact_number(String emergency_contact_number) {
        this.emergency_contact_number = emergency_contact_number;
    }

    public String getUser_created_date() {
        return user_created_date;
    }

    public void setUser_created_date(String user_created_date) {
        this.user_created_date = user_created_date;
    }
}
