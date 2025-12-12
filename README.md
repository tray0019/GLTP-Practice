```mermaid
flowchart TD

%% ===================== FRONTEND =====================
A[Frontend (React)]:::frontend
A -->|REST JSON Calls\n/goals\n/goals/{id}\n/goal-checks| B

%% ===================== BACKEND =====================
subgraph B[Backend (Spring Boot API)]
direction TB

    %% Controllers
    subgraph C1[Controller Layer]
    direction TB
        GC[GoalController]
        EC[EntryController (future)]
        GCC[GoalCheckController (future)]
    end

    %% DTOs
    subgraph C2[DTO Layer]
    direction TB
        GCD[GoalCreateDto]
        GRD[GoalResponseDto]
    end

    C1 --> C2

    %% Service Layer
    subgraph C3[Service Layer]
    direction TB
        GS[GoalService]
        ES[EntryService (future)]
        GCS[GoalCheckService (future)]
    end
    C1 --> C3
    C3 --> C2

    %% Entity Layer
    subgraph C4[Entity Layer (JPA)]
    direction TB
        EGoal[Goal]
        EEntry[Entry (future)]
        ECheck[GoalCheck (future)]
    end
    C3 --> C4

    %% Repository Layer
    subgraph C5[Repository Layer]
    direction TB
        GR[GoalRepository]
        ER[EntryRepository (future)]
        GCR[GoalCheckRepository]
    end

    C4 --> C5
end

%% ===================== DATABASE =====================
C5 -->|JPA / Hibernate| D[(MySQL Database)]

subgraph DB[Database Schema (MySQL)]
direction TB
    T1[goal\n- id (PK)\n- goal_title\n- position (DnD order)\n- created_at]
    T2[goal_check\n- id\n- goal_id (FK)\n- date\n- done]
    T3[entry\n- id\n- goal_id (FK)\n- title\n- notes]
end

D --> DB

%% ===================== STYLE =====================
classDef frontend fill:#4dabf7,stroke:#1c7ed6,color:white,border-width:2px
classDef backend fill:#ffd43b,stroke:#f08c00,color:black,border-width:2px
