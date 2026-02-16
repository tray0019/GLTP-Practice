package org.practice.gltp_practice.Repository;

import org.practice.gltp_practice.Entity.Goal;
import org.practice.gltp_practice.Entity.GoalEntry;
import org.practice.gltp_practice.Entity.ProgressEntry;
import org.practice.gltp_practice.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProgressEntryRepository extends JpaRepository<GoalEntry, Long> {

    Optional<GoalEntry> findByIdAndGoal_User(Long entryId, User user);
    List<GoalEntry> findByGoal(Goal goal);
    List<GoalEntry> findByGoalAndGoal_User(Goal goal, User user);
}
