package org.practice.gltp_practice.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.practice.gltp_practice.Entity.Rank;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UserProgressResponse {

    private int totalXP;
    private int dailyXP;
    private Rank currentRank;
    private LocalDate lastActivityDate;
}
