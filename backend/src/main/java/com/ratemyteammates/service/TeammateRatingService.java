package com.ratemyteammates.service;

import com.ratemyteammates.dto.TeammateRatingRequest;
import com.ratemyteammates.dto.TeammateRatingResponse;
import com.ratemyteammates.model.TeammateRating;
import com.ratemyteammates.repository.TeammateRatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeammateRatingService {

    private final TeammateRatingRepository teammateRatingRepository;

    public TeammateRatingResponse submitRating(TeammateRatingRequest request) {
        TeammateRating teammateRating = TeammateRating.builder()
                .lastName(request.getLastName())
                .socialScore(request.getSocialScore())
                .groupCollaborationScore(request.getGroupCollaborationScore())
                .courseNumber(request.getCourseNumber())
                .comments(request.getComments())
                .approved(false) // All submissions start as unapproved
                .build();

        TeammateRating savedRating = teammateRatingRepository.save(teammateRating);
        return mapToResponse(savedRating);
    }

    public List<TeammateRatingResponse> getApprovedRatings() {
        return teammateRatingRepository.findByApprovedTrue().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<TeammateRatingResponse> getPendingRatings() {
        return teammateRatingRepository.findByApprovedFalse().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TeammateRatingResponse approveRating(Long id) {
        TeammateRating rating = teammateRatingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Rating not found with id: " + id));
        
        rating.setApproved(true);
        TeammateRating savedRating = teammateRatingRepository.save(rating);
        
        return mapToResponse(savedRating);
    }

    public TeammateRatingResponse rejectRating(Long id) {
        TeammateRating rating = teammateRatingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Rating not found with id: " + id));
        
        teammateRatingRepository.delete(rating);
        
        return mapToResponse(rating);
    }

    private TeammateRatingResponse mapToResponse(TeammateRating teammateRating) {
        return TeammateRatingResponse.builder()
                .id(teammateRating.getId())
                .lastName(teammateRating.getLastName())
                .socialScore(teammateRating.getSocialScore())
                .groupCollaborationScore(teammateRating.getGroupCollaborationScore())
                .courseNumber(teammateRating.getCourseNumber())
                .submissionDate(teammateRating.getSubmissionDate())
                .approved(teammateRating.isApproved())
                .comments(teammateRating.getComments())
                .build();
    }
} 