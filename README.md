                        ┌─────────────────────────────────────┐
                        │            FRONTEND (React)          │
                        │──────────────────────────────────────│
                        │ • Goal List UI                       │
                        │ • Drag & Drop (@hello-pangea/dnd)    │
                        │ • Axios API calls                    │
                        │ • Global Calendar View               │
                        │ • Rename, Delete, Mark Done          │
                        └───────────────▲──────────────────────┘
                                        │   REST API (JSON)
                                        │   /goals
                                        │   /goals/{id}
                                        │   /goal-checks
                                        │
                                        ▼
       ┌────────────────────────────────────────────────────────────────────┐
       │                    BACKEND (Spring Boot API)                       │
       │────────────────────────────────────────────────────────────────────│
       │  ┌───────────────────────────┐   ┌───────────────────────────────┐ │
       │  │      Controller Layer     │   │        DTO Layer              │ │
       │  │───────────────────────────│   │───────────────────────────────│ │
       │  │ GoalController            │   │ GoalCreateDto                 │ │
       │  │ EntryController (future)  │   │ GoalResponseDto               │ │
       │  │ GoalCheckController (future)                                 │ │
       │  └───────────────┬──────────┘   └───────────────┬──────────────┘ │
       │                  │                            │                  │
       │                  │ calls                      │ data mapping     │
       │                  ▼                            ▼                  │
       │  ┌───────────────────────────┐   ┌───────────────────────────────┐ │
       │  │        Service Layer      │   │     Entity Layer (JPA)        │ │
       │  │───────────────────────────│   │───────────────────────────────│ │
       │  │ GoalService                │  │ Goal                           │ │
       │  │ EntryService (future)      │  │ GoalCheck (future)             │ │
       │  │ GoalCheckService (future)  │  │ Entry (future)                 │ │
       │  └───────────────┬──────────┘   └───────────────┬──────────────┘ │
       │                  │                            │                  │
       │                  │ uses                       │ persisted via JPA│
       │                  ▼                            ▼                  │
       │  ┌───────────────────────────┐                                  │ │
       │  │     Repository Layer      │                                  │ │
       │  │───────────────────────────│                                  │ │
       │  │ GoalRepository            │                                  │ │
       │  │ EntryRepository (future)  │                                  │ │
       │  │ GoalCheckRepository       │                                  │ │
       │  └───────────────┬──────────┘                                  │ │
       └──────────────────│──────────────────────────────────────────────┘
                          │  JPA / Hibernate Queries
                          ▼
                ┌───────────────────────────────────────┐
                │              DATABASE (MySQL)          │
                │────────────────────────────────────────│
                │ Tables:                                │
                │   • goal                               │
                │       id (PK)                          │
                │       goal_title                       │
                │       position (future DnD order)      │
                │       created_at                       │
                │                                         │
                │   • goal_check (future)                │
                │       id                               │
                │       goal_id (FK)                     │
                │       date                             │
                │       done                             │
                │                                         │
                │   • entry (future)                     │
                │       id                               │
                │       goal_id (FK)                     │
                │       title, notes                     │
                └────────────────────────────────────────┘
