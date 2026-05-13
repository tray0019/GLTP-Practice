package org.practice.gltp_practice.Entity;


import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.br.CPF;
import org.springframework.cglib.core.Local;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity(name="Goal")
@Getter
@Setter
@ToString(exclude = {"goal", "user", "recipient"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Goal implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String goalTitle;

    @OneToMany(mappedBy = "goal", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<ProgressEntry> entries;

    @OneToMany(mappedBy = "goal", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<GoalCheck> checks;

    @Column(nullable = false)
    private Integer position;

    @Column(nullable = false)
    private boolean archived = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulty difficulty = Difficulty.MEDIUM;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GoalStatus status = GoalStatus.ACTIVE;


    @Column(nullable = false)
    private boolean isAchievement;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @Column(name="category")
    private String category;

    @Column(name="use_case")
    private String useCase;

   @Column(nullable = false)
    private boolean isPrivate = false;

    @Column(nullable = false)
    private boolean notesPrivate = false;

    @Column(nullable = false, updatable = false)
    private LocalDate createdAt;

    @PrePersist
    protected void onCreate(){
        this.createdAt = LocalDate.now();
    }


























}