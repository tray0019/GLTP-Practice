package org.practice.gltp_practice.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;


@Data
@Entity(name="Goal")
public class Goal{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String goalTitle;

    @OneToMany(mappedBy = "goal", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<ProgressEntry> entries;

    @OneToMany(mappedBy = "goal",cascade = CascadeType.REMOVE, orphanRemoval = true )
    private List<GoalCheck> checks;

    @Column(nullable = false)
    private Integer postition;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulty difficulty = Difficulty.MEDIUM;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GoalStatus status = GoalStatus.ACTIVE;

    @Column(nullable = false)
    private boolean isAchievement;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = true)
    private User user;

    @Column(name="category")
    private String category;

    @Column(name="use_case")
    private String useCase;
}

















/*
@Entity(name="gltp_practice")
@Data
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String goalTitle;

}
 */

