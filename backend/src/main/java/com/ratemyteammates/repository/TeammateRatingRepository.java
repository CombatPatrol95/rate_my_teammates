package com.ratemyteammates.repository;

import com.ratemyteammates.model.TeammateRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeammateRatingRepository extends JpaRepository<TeammateRating, Long> {
    List<TeammateRating> findByApprovedTrue();
    List<TeammateRating> findByApprovedFalse();
    List<TeammateRating> findByLastName(String lastName);
    List<TeammateRating> findByCourseNumber(String courseNumber);
} 