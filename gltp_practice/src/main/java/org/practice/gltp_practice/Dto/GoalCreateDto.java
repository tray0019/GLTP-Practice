package org.practice.gltp_practice.Dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
public class GoalCreateDto{

    @NotBlank(message ="Title is mandatory")
    private String goalTitle;

    private Integer difficulty;
}




























/*
@Data
public class GoalCreateDto {

    @NotBlank(message = "Title is mandatory")
    private String goalTitle;

}
 */
