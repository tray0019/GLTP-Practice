import {useState, useEffect} from "react";
import AddGoalForm from "../components/AddGoalForm";
import GoalCard from "../components/GoalCard";

import { createGoal, getAllGoals, deleteGoal } from "../api/goalApi";
import "../styles.css";

function Home(){
    const [goals, setGoals] = useState([]);
    const [isLoadingGoals, setIsLoadingGoals] = useState(false);

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
            await fetchData();
        }catch(err){
            console.error(err);
        }
    }

    const handleDeleteGoal = async function(goalId) {
        try{
            await deleteGoal(goalId);
            await fetchData();
        }catch(err){
            console.error(err);
        }
    }

    return(
        <div className="app-container">
            <h1>Goals</h1>
            <AddGoalForm onAdd={handleAddGoal}/>
            <ul className="goal-list" >
                {goals.map(goal=>{
                    return(
                        <li style={{ marginBottom: "9px"}}>
                        <GoalCard goal={goal}
                        onDelete={handleDeleteGoal} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Home;