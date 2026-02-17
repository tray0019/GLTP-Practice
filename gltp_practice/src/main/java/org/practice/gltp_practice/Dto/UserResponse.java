package org.practice.gltp_practice.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.practice.gltp_practice.Entity.Gender;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private Long id;
    private String firstName;
    private String email;
    private LocalDate birthDate;
    private Gender gender;
    private boolean profileCompleted;
}
