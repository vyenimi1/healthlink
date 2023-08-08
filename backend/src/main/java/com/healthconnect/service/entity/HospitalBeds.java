package com.healthconnect.service.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "hospital_beds")
@Entity
@Data
public class HospitalBeds {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "serial_num")
    private Long serialNum;

    @Column(name = "h_id")
    private Long hospitalId;

    @Column(name = "h_regular_beds")
    private Long regularBeds;

    @Column(name = "h_icu_beds")
    private Long icuBeds;

    @Column(name = "h_pediatric_beds")
    private Long pediatricBeds;

    @Column(name = "h_maternity_beds")
    private Long maternityBeds;

    @Column(name = "h_birthing_beds")
    private Long birthingBeds;

    @Column(name = "h_orthopedic_beds")
    private Long orthopedicBeds;

    @Column(name = "h_homecare_beds")
    private Long homecareBeds;

    @Column(name = "h_emergency_beds")
    private Long emergencyBeds;

}



