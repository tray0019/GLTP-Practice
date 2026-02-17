package org.practice.gltp_practice.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class GoalWithEntriesDto {

    private Long goalId;
    private String goalTitle;
    private List<EntryResponseDto> entries;

    private List<GoalCheckDto> checks;

    private Long userId;
    private String userName;
}
