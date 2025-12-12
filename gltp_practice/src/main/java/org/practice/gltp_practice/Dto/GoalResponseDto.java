package org.practice.gltp_practice.Dto;
//Goal Response
// id and Goal title


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GoalResponseDto{

    private long goalId;

    private String goalTitle;

}


































/*
@Data
@AllArgsConstructor
public class GoalResponseDto {

    private long id;
    private String goalTitle;

}
 */
