package org.practice.gltp_practice.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="user_progress")
@Data
public class UserProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int totalXP = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private Rank currentRank = Rank.UNRANKED;

    @Column(nullable = false)
    private LocalDate lastActivityDate;

    @Column(updatable = false)
    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    @Column(nullable = false)
    private int dailyXP;

    @PrePersist
    protected void onCreate(){
        this.createAt = LocalDateTime.now();
        this.updateAt = LocalDateTime.now();
        this.lastActivityDate = LocalDate.now();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updateAt = LocalDateTime.now();
    }

    @OneToOne
    @JoinColumn(name="user_id", nullable = false)
    User user;


}
