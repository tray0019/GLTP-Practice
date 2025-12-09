package org.practice.gltp_practice.Controller;



//Goal controller
// create a goal, get all goal, rename all goal, delete all goal
// use dto


import org.practice.gltp_practice.Dto.GoalCreateDto;
import org.practice.gltp_practice.Dto.GoalResponseDto;
import org.practice.gltp_practice.Entity.Goal;
import org.practice.gltp_practice.Service.GoalService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class GoalController{

    private GoalService service;

    GoalController(GoalService service){
        this.service = service;
    }

    @PostMapping("/goals")
    public GoalResponseDto createGoal(@RequestBody GoalCreateDto dto){
        Goal goal = new Goal();
        goal.setGoalTitle(dto.getGoalTitle());
        Goal save = service.createGoal(goal);
        return new GoalResponseDto(save.getId(), save.getGoalTitle());
    }

    @GetMapping("/goals")
    public List<GoalResponseDto> viewAllGoal(){
        List<Goal> goals = service.viewAllGoal();
        List<GoalResponseDto> dtoList = new ArrayList<>();

        for(Goal goal: goals){
            GoalResponseDto dto = new GoalResponseDto(goal.getId(), goal.getGoalTitle());
            dtoList.add(dto);
        }
        return dtoList;
    }

    @PutMapping("/goals/{goalId}")
    public GoalResponseDto renameGoal(@PathVariable long goalId, @RequestParam String newTitle){
        Goal goal = service.renameGoal(goalId,newTitle);
        return new GoalResponseDto(goal.getId(), goal.getGoalTitle());
    }

    @DeleteMapping("/goals/{goalId}")
    public void deleteGoal(@PathVariable long goalId){
        service.deleteGoal(goalId);
    }

}















/*
@RestController
public class GoalController {

    private final GoalService service;

    GoalController(GoalService service){
        this.service = service;
    }

    @PostMapping("/goals")
    public GoalResponseDto createGoal(@Valid @RequestBody GoalCreateDto dto){
        Goal goal = new Goal();
        goal.setGoalTitle(dto.getGoalTitle());
        Goal save = service.createGoal(goal);
        return new GoalResponseDto(save.getId(), save.getGoalTitle());
    }

    @GetMapping("/goals")
    public List<GoalResponseDto> getAllGoal(){
        List<Goal> goals = service.viewAllGoal();
        List<GoalResponseDto> dtoList = new ArrayList<>();

        for(Goal goal: goals){
            GoalResponseDto dto = new GoalResponseDto(goal.getId(), goal.getGoalTitle());
            dtoList.add(dto);
        }
        return dtoList;
    }

    @PutMapping("/goals/{goalId}")
    public GoalResponseDto renameGoal(@PathVariable long goalId, @RequestParam String newTitle){
        Goal goal = service.renameGoal(goalId, newTitle);
        return new GoalResponseDto(goal.getId(), goal.getGoalTitle());
    }

    @DeleteMapping("/goals/{goalId}")
    public void deleteGoal(@PathVariable long goalId){
        service.deleteGoal(goalId);
    }

}
 */

