package org.practice.gltp_practice.Dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GoalCreateDto{


    @NotBlank(message = "Goal Title is mandatory")
    private String goalTitle;
}































/*
@Data
public class GoalCreateDto {

    @NotBlank(message = "Title is mandatory")
    private String goalTitle;

}
 */
