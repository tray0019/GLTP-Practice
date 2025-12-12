# GLTP-Practice

flowchart TD

%% ===========================
%% FRONTEND
%% ===========================

A[React Frontend<br>• Goal Cards<br>• Drag & Drop (hello-pangea/dnd)<br>• Axios API Calls] 

%% ===========================
%% BACKEND LAYERS
%% ===========================

subgraph B[Spring Boot Backend]
    
    subgraph C[Controller Layer]
        C1[GoalController<br>• POST /goals<br>• GET /goals<br>• PUT /goals/{id}<br>• DELETE /goals/{id}]
    end

    subgraph D[Service Layer]
        D1[GoalService<br>• createGoal()<br>• viewAllGoal()<br>• renameGoal()<br>• deleteGoal()]
    end

    subgraph E[Repository Layer]
        E1[GoalRepository<br>extends JpaRepository]
    end

    subgraph F[Entity + DTO Layer]
        F1[Goal Entity<br>• id<br>• goalTitle]
        F2[GoalCreateDto]
        F3[GoalResponseDto]
    end

end

%% ===========================
%% DATABASE
%% ===========================

G[(MySQL Database<br>Table: goal)]

%% ===========================
%% FLOW
%% ===========================

A -->|JSON over HTTP| C1
C1 --> D1
D1 --> E1
E1 --> G

%% DTO mappings
C1 <-->|maps DTOs| F2
C1 <-->|returns DTOs| F3
