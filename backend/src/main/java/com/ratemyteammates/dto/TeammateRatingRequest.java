package com.ratemyteammates.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeammateRatingRequest {
    
    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    private String lastName;
    
    @Min(value = 1, message = "Social score must be between 1 and 10")
    @Max(value = 10, message = "Social score must be between 1 and 10")
    private Integer socialScore;
    
    @Min(value = 1, message = "Group collaboration score must be between 1 and 10")
    @Max(value = 10, message = "Group collaboration score must be between 1 and 10")
    private Integer groupCollaborationScore;
    
    @NotBlank(message = "Course number is required")
    private String courseNumber;
    
    private String comments;
} 