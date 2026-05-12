package org.practice.gltp_practice.Repository;

import org.practice.gltp_practice.Entity.Goal;
import org.practice.gltp_practice.Entity.GoalStatus;
import org.practice.gltp_practice.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long>{

    Optional<Goal> findByIdAndUser(Long id, User user);
    List<Goal> findByUserAndArchievementTrueOrderByPositionAsc(User user);
    List<Goal> findByUserAndStatusOrderByPositionAsc(User user, GoalStatus status);
    List<Goal> findAllByUserOrderByPositionAsc(User user);

    List<Goal> findByUserAndStatusAndArchivedFalseAndIsAchievementFalseOrderByPositionAcs(
            User user, GoalStatus status
    );

    @Query("SELECT MAX(g.position) FROM Goal g WHERE g.user = :user")
    Integer findMaxPositionByUser(User user);
}


















/*
@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
}
 */



