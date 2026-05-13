package org.practice.gltp_practice.Entity;


import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
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
















}