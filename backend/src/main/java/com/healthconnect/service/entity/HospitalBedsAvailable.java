package com.healthconnect.service.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "hospital_beds_availabilty")
@Entity
@Data
public class HospitalBedsAvailable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "serial_num")
    private Long serialNum;

    @Column(name = "h_id")
    private Long hospitalId;

    @Column(name = "h_regular_beds_avail")
    private Long regularBedsAvail;

    @Column(name = "h_icu_beds_avail")
    private Long icuBedsAvail;

    @Column(name = "h_pediatric_beds_avail")
    private Long pediatricBedsAvail;

    @Column(name = "h_maternity_beds_avail")
    private Long maternityBedsAvail;

    @Column(name = "h_birthing_beds_avail")
    private Long birthingBedsAvail;

    @Column(name = "h_orthopedic_beds_avail")
    private Long orthopedicBedsAvail;

    @Column(name = "h_homecare_beds_avail")
    private Long homecareBedsAvail;

    @Column(name = "h_emergency_beds_avail")
    private Long emergencyBedsAvail;

}

