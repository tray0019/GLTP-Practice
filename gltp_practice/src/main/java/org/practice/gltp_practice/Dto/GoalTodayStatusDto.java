package org.practice.gltp_practice.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class GoalTodayStatusDto {

    private Long goalId;
    private boolean doneToday;
}
