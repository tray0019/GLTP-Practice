package org.practice.gltp_practice.Dto;

import org.practice.gltp_practice.Entity.Rank;

public record UserSearch(
        Long id,
        String firstName,
        String lastName,
        Rank currentRank,
        int totalXP,
        boolean isFollowing
) {
}
