package tech.hospital.healthcare.model;

import jakarta.persistence.*;

import java.io.Serializable;
@Entity
public class HospitalAccount  implements Serializable {
@Id
@GeneratedValue(strategy = GenerationType.AUTO)
@Column(nullable = false,updatable = false)
    private Long h_id;
    private String h_password;
    private String h_name;
    private String h_street ;
    private String h_zip_code;
    private String h_city ;
    private String h_state ;
    private String h_contact_number;
    private String h_email;
    private String h_website;
    private String h_lab_facility;
    private String h_insurance_acceptance;

    public HospitalAccount(){}
    public HospitalAccount(Long hId, String hPassword, String hName, String hStreet, String hZipCode, String hCity, String hState, String hContactNumber, String hEmail, String hWebsite, String hLabFacility, String hInsuranceAcceptance) {
        this.h_id = hId;
        this.h_password = hPassword;
        this.h_name = hName;
        this.h_street = hStreet;
        this.h_zip_code = hZipCode;
        this.h_city = hCity;
        this.h_state = hState;
        this.h_contact_number = hContactNumber;
        this.h_email = hEmail;
        this.h_website = hWebsite;
        this.h_lab_facility = hLabFacility;
        this.h_insurance_acceptance = hInsuranceAcceptance;
    }

    public Long getH_id() {
        return h_id;
    }

    public void setH_id(Long h_id) {
        this.h_id = h_id;
    }

    public String getH_password() {
        return h_password;
    }

    public void setH_password(String h_password) {
        this.h_password = h_password;
    }

    public String getH_name() {
        return h_name;
    }

    public void setH_name(String h_name) {
        this.h_name = h_name;
    }

    public String getH_street() {
        return h_street;
    }

    public void setH_street(String h_street) {
        this.h_street = h_street;
    }

    public String getH_zip_code() {
        return h_zip_code;
    }

    public void setH_zip_code(String h_zip_code) {
        this.h_zip_code = h_zip_code;
    }

    public String getH_city() {
        return h_city;
    }

    public void setH_city(String h_city) {
        this.h_city = h_city;
    }

    public String getH_state() {
        return h_state;
    }

    public void setH_state(String h_state) {
        this.h_state = h_state;
    }

    public String getH_contact_number() {
        return h_contact_number;
    }

    public void setH_contact_number(String h_contact_number) {
        this.h_contact_number = h_contact_number;
    }

    public String getH_email() {
        return h_email;
    }

    public void setH_email(String h_email) {
        this.h_email = h_email;
    }

    public String getH_website() {
        return h_website;
    }

    public void setH_website(String h_website) {
        this.h_website = h_website;
    }

    public String getH_lab_facility() {
        return h_lab_facility;
    }

    public void setH_lab_facility(String h_lab_facility) {
        this.h_lab_facility = h_lab_facility;
    }

    public String getH_insurance_acceptance() {
        return h_insurance_acceptance;
    }

    public void setH_insurance_acceptance(String h_insurance_acceptance) {
        this.h_insurance_acceptance = h_insurance_acceptance;
    }
}
