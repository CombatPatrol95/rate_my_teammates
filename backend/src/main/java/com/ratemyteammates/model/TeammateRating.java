package com.ratemyteammates.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "teammate_ratings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeammateRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(nullable = false)
    private String lastName;
    
    @Min(1)
    @Max(10)
    @Column(nullable = false)
    private Integer socialScore;
    
    @Min(1)
    @Max(10)
    @Column(nullable = false)
    private Integer groupCollaborationScore;
    
    @NotBlank
    @Column(nullable = false)
    private String courseNumber;
    
    @Column(nullable = false)
    private LocalDateTime submissionDate;
    
    @Column(nullable = false)
    private boolean approved;
    
    @Column
    private String comments;
    
    @PrePersist
    protected void onCreate() {
        submissionDate = LocalDateTime.now();
    }
} 