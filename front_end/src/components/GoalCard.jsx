
function GoalCard({goal}){

    return(
        <li>
                        <div style={{
                            border: "1px solid #ddd"
                        }}>
                        <h3>{goal.goalTitle}</h3>

                        </div>
                    </li>
    )

}

export default GoalCard;

