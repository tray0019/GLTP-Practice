package org.practice.gltp_practice.Dto;

public record PublicEntryDto(
        Long id,
        String description,
        java.time.LocalDateTime createdAt
) {
}
