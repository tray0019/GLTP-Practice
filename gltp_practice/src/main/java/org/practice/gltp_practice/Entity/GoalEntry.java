package org.practice.gltp_practice.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity(name = "GoalEntry")
@Data
public class GoalEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String description;

    @Column(nullable = false, updatable = false)
    private java.time.LocalDateTime createdAt;

    @PrePersist
    private void onCreate(){
        this.createdAt = java.time.LocalDateTime.now();
    }
}


