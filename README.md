flowchart TD

    %% FRONTEND
    FE[Frontend (React)]

    %% BACKEND
    subgraph BE[Backend (Spring Boot)]
        direction TB

        subgraph CTRL[Controllers]
            GC[GoalController]
            EC[EntryController]
            GCC[GoalCheckController]
        end

        subgraph DTO[DTOs]
            GCD[GoalCreateDto]
            GRD[GoalResponseDto]
        end

        subgraph SRV[Services]
            GS[GoalService]
            ES[EntryService]
            GCS[GoalCheckService]
        end

        subgraph ENT[Entities]
            EG[Goal]
            EE[Entry]
            EGC[GoalCheck]
        end

        subgraph REP[Repositories]
            GR[GoalRepository]
            ER[EntryRepository]
            GCR[GoalCheckRepository]
        end

        CTRL --> DTO
        CTRL --> SRV
        SRV --> ENT
        ENT --> REP
    end

    %% DATABASE
    DB[(MySQL Database)]

    FE -->|REST API| BE
    REP --> DB
