package com.healthconnect.service.repository;

import com.healthconnect.service.entity.DoctorDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface DoctorDetailsRepository extends JpaRepository<DoctorDetails, Long> {

    List<DoctorDetails> findAllByHospitalId(Long hospitalId);
}
