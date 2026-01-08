import {useState, useEffect} from "react";
import AddGoalForm from "../components/AddGoalForm"

import { createGoal, getAllGoals } from "../api/goalApi";

function Home(){
    const [goals, setGoals] = useState([]);

    function fetchData(){
        getAllGoals().then(res=>{
            setGoals(res.data);
        }).catch(err=>{
            console.error(err);
        })
    }
    
    useEffect(()=>{
        fetchData();
    },[]);

    const [isLoadingGoals, setIsLoadingGoals] = useState(false);

    const loadGoals = async() =>{
        try{
         setIsLoadingGoals(true);
         

        }catch(err){

        }finally{

        }
    }

    const handleAddGoal = async (title) => {
        try{
            await createGoal(title);

        }catch(err){
            console.error(err);
        }
    }

    return(
        <div>
            <h1>Goals</h1>
            <AddGoalForm onAdd={handleAddGoal}/>
            <ul>
                {goals.map(goal=>{
                    return(
                    <li>
                        <div style={{
                            border: "1px solid #ddd"
                        }}>
                        <h3>{goal.goalTitle}</h3>

                        </div>
                    </li>
                    )
                })}

            </ul>
        </div>
    )

}

export default Home;