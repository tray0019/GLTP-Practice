
function GoalCard({
    goal,onDelete }){

    return(
        <div className="goal-card">
            <h3>{goal.goalTitle}</h3>
            <button>View</button>
            <button style={{ marginLeft: "9px"}}
                onClick={()=>{
                    if(window.confirm("Are you sure you want to delete this goal?"));
                    onDelete(goal.id)
                }}
            >Delete</button>
        </div>
    )

}

export default GoalCard;

