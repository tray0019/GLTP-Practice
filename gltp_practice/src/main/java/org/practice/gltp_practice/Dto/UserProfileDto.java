package org.practice.gltp_practice.Dto;

import java.util.List;

public record UserProfileDto(
        Long id,
        String firstName,
        String lastName,
        String rank,
        int totalXp,
        int followersCount,
        int followingCount,
        boolean isFollowing,
        List<PublicGoalDetailDto> goals,
        List<GlobalContribution> calendarData,
        int rankProgress,
        int dailyXP
) {
}
