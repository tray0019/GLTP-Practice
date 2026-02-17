package org.practice.gltp_practice.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.practice.gltp_practice.Entity.GoalStatus;

@Data
@AllArgsConstructor
public class GoalResponseDto{

    private long id;
    private String goalTitle;
    private int difficulty;
    private int position;
    private GoalStatus status;
    private String category;
    private String useCase;

    @Deprecated
    private boolean archive;


}

































/*
@Data
@AllArgsConstructor
public class GoalResponseDto {

    private long id;
    private String goalTitle;

}
 */
