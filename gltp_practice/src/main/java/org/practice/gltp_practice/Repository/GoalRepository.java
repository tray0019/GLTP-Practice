package org.practice.gltp_practice.Repository;

import org.practice.gltp_practice.Entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long>{
}



















/*
@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
}
 */



