package org.practice.gltp_practice.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity(name="ProgressEntry")
@Data
public class ProgressEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    private java.time.LocalDateTime createdAt;

    //@org.hibernate.annotations.CreationTimestamp -- optional

    @ManyToOne
    @JoinColumn(name="goal_id")
    private Goal goal;

    @PrePersist
    protected void onCreate(){
        this.createdAt = java.time.LocalDateTime.now();
    }

}
