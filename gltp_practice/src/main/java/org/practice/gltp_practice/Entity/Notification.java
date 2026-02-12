package org.practice.gltp_practice.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Notification {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"goals", "following", "followers", "createdAt", "updatedAt"})
    private User recipient;

    private String message;
    private String type;
    private boolean isRead = false;

    @Column(updatable = false)
    @org.hibernate.annotations.CreationTimestamp
    private LocalDateTime createdAt;
}
