package org.practice.gltp_practice.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;


//Goal Response
// id and Goal title

@Data
@AllArgsConstructor // ask
public class GoalResponseDto{

    private long id;
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
