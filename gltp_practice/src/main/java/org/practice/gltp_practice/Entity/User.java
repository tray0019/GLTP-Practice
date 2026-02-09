package org.practice.gltp_practice.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="users")
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {
    @Id
    private Long id; //include DB primary key - missing EqualsAndHash

    @Column(nullable = true)
    private String firstName;

    @Column(nullable = true)
    private String lastName;

    private LocalDate birthDate;

    //Gender

    @Column(nullable = false, unique = true)
    private String email; //include DB email - missing EqualsAndHash

    @Column(nullable = false)
    private String provider;

    @Column(nullable = false, unique = true)
    private String providerUserId;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Goal> goals;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private boolean profileCompleted = false;

    @PrePersist
    protected void onCreate(){
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate(){
        updatedAt = LocalDateTime.now();
    }


    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "user_following",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "following_id")
    )
    private Set<User> following = new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "following")
    private Set<User> followers = new HashSet<>();



}
