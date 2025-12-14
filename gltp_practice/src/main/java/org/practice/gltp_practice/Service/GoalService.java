package org.practice.gltp_practice.Service;


import org.practice.gltp_practice.Entity.Goal;
import org.practice.gltp_practice.Repository.GoalRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class GoalService{

    private final GoalRepository goalRepo;

    GoalService(GoalRepository goalRepo){
        this.goalRepo = goalRepo;
    }

    public Goal createGoal(Goal goal){
        return goalRepo.save(goal);
    }

    public List<Goal> viewAllGoal(){
        return goalRepo.findAll();
    }

    public Goal renameGoal(long goalId, String newTitle){
        Goal goal = goalRepo.findById(goalId)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Goal Id not found"));
        goal.setGoalTitle(newTitle);
        return goalRepo.save(goal);
    }

    public void deleteGoal(long goalId){
        if(!goalRepo.existsById(goalId)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Goal Id not found");
        }else{
            goalRepo.deleteById(goalId);
        }
    }

}



























/*
@Service
public class GoalService {

    private GoalRepository goalRepo;

    GoalService(GoalRepository goalRepo){
        this.goalRepo = goalRepo;
    }

    //Create a goal
    public Goal createGoal(Goal goal){
        return goalRepo.save(goal);
    }

    //View all goal
    public List<Goal> viewAllGoal(){
        return goalRepo.findAll();
    }

    //Rename a goal
    public Goal renameGoal(long goalId, String newTitle){
        Goal goal = goalRepo.findById(goalId)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Goal Id not found"));
        goal.setGoalTitle(newTitle);
        return goalRepo.save(goal);
    }

    //Delete a goal
    public void deleteGoal(long goalId){
        if(!goalRepo.existsById(goalId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Goal Id not found");
        }
            goalRepo.deleteById(goalId);
        }

    //ViewGoal by Id
    public Goal viewGoal(long goalId){
        Optional<Goal> boxGoal = goalRepo.findById(goalId);

        if(boxGoal.isPresent()){
            return boxGoal.get();
        }else{
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,"Goal not found");
        }
    }

}
 */


