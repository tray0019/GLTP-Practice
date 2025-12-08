package org.practice.gltp_practice.Dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;


// Goal Dto
// Goal title have -- cannot be blank

@Data
public class GoalCreateDto{

    @NotBlank(message="Title is mandatory")
    private String goalTitle;

}













/*
@Data
public class GoalCreateDto {

    @NotBlank(message = "Title is mandatory")
    private String goalTitle;

}
 */
