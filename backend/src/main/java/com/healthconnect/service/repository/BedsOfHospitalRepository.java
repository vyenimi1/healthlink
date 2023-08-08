package com.healthconnect.service.repository;

import com.healthconnect.service.entity.HospitalBeds;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BedsOfHospitalRepository extends JpaRepository<HospitalBeds, Long> {
}
