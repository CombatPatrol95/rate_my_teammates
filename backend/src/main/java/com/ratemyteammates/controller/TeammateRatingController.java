package com.ratemyteammates.controller;

import com.ratemyteammates.dto.TeammateRatingRequest;
import com.ratemyteammates.dto.TeammateRatingResponse;
import com.ratemyteammates.service.TeammateRatingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TeammateRatingController {

    private final TeammateRatingService teammateRatingService;

    @PostMapping("/user-submitted-data")
    public ResponseEntity<TeammateRatingResponse> submitRating(@Valid @RequestBody TeammateRatingRequest request) {
        TeammateRatingResponse response = teammateRatingService.submitRating(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/approved-data")
    public ResponseEntity<List<TeammateRatingResponse>> getApprovedRatings() {
        List<TeammateRatingResponse> approvedRatings = teammateRatingService.getApprovedRatings();
        return ResponseEntity.ok(approvedRatings);
    }

    @GetMapping("/admin/pending-ratings")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<TeammateRatingResponse>> getPendingRatings() {
        List<TeammateRatingResponse> pendingRatings = teammateRatingService.getPendingRatings();
        return ResponseEntity.ok(pendingRatings);
    }

    @PutMapping("/admin/approve-rating/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TeammateRatingResponse> approveRating(@PathVariable Long id) {
        TeammateRatingResponse approvedRating = teammateRatingService.approveRating(id);
        return ResponseEntity.ok(approvedRating);
    }

    @DeleteMapping("/admin/reject-rating/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TeammateRatingResponse> rejectRating(@PathVariable Long id) {
        TeammateRatingResponse rejectedRating = teammateRatingService.rejectRating(id);
        return ResponseEntity.ok(rejectedRating);
    }
} 