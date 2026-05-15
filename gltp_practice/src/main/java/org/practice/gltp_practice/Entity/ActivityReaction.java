package org.practice.gltp_practice.Entity;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Getter
@Setter
@ToString(exclude = {"goal,user,recipient"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(
        name = "activity_reaction",
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"ractor_id","target_user_id","reaction_type", "reaction_date" }
        )
)
public class ActivityReaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reactor_id", nullable = false)
    private User targetUser;

    //private ReactionType reactionType;

    @Column(name="reaction_date",nullable = false)
    private LocalDate reactionDate;

    @Column(name="created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
