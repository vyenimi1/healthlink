package com.healthconnect.service.repository;

import com.healthconnect.service.entity.HospitalBedsAvailable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalBedsAvailabilityRepository extends JpaRepository<HospitalBedsAvailable, Long> {
}
