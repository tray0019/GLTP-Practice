package org.practice.gltp_practice.Repository;

import org.practice.gltp_practice.Dto.LeaderboardUserDTO;
import org.practice.gltp_practice.Entity.User;
import org.practice.gltp_practice.Entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {


    UserProgress findTopByOrderByIdAsc();
    Optional<UserProgress> findByUser(User user);


    @Query("SELECT new org.practice.gltp_practice.Dto.LeaderboardUserDTO("+
            "p.user.id, "+
            "p.user.firstName, "+
            "p.user.lastName, "+
            "p.totalXP, "+
            "p.currentRank) "+
            "FROM UserProgress p "+
            "ORDER BY p.totalXP DESC")
    List<LeaderboardUserDTO> getGlobalLeaderboard();


}
