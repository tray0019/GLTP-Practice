package org.practice.gltp_practice.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;


// class Goal
// id and Goal title

@Entity(name="gltp_practice")
@Data
public class Goal{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long goalId;

    private String goalTitle;


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

