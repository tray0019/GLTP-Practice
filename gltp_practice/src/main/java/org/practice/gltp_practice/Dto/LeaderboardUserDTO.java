package org.practice.gltp_practice.Dto;

import org.practice.gltp_practice.Entity.Rank;

public record LeaderboardUserDTO(
        Long id,              // Added this!
        String firstName,
        String lastName,
        int totalXP,
        Rank currentRank
) { }
