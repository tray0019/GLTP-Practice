package org.practice.gltp_practice.Dto;

import java.time.LocalDate;
import java.util.List;

public record PublicGoalDetailDto(
        Long id,
        String title,
        Integer position,
        List<LocalDate> checkDates,
        String difficulty,
        List<PublicEntryDto> entries,
        String Category, String useCase
) {
}
