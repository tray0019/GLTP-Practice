
import {useEffect, useState} from "react";
import axios from "axios";

function App(){

  const [goals, setGoals] = useState([]);
  const [newGoalTitle, setNewGoalTitle] = useState("");

  function fetchGoals(){
    axios.get(`http://localhost:8080/goals`)
      .then(res2=>{
        setGoals(res2.data);
      }).catch(err2=>{
        console.error(err2);
      })
  }

  useEffect(()=>{
    fetchGoals();
  },[]);

  function handleAddGoal(){
    if(!newGoalTitle.trim()){
      alert("Enter goal title");
      return;
    }
    axios.post(`http://localhost:8080/goals`,{
      goalTitle: newGoalTitle
    }).then(()=>{
      fetchGoals();
    }).catch(err=>{
      console.error(err);
    })
  }

  function handleDeleteGoal(goalId){
    axios.delete(`http://localhost:8080/goals/${goalId}`)
      .then(()=>{
        fetchGoals();
      })
  }

  return(
    <div style={{maxWidth: "600px", margin: "20px auto"}}>
      <h1>Goals</h1>
      <div>
        <h3>Add Goal</h3>
        <input
        placeholder="Enter goal title"
        type="text"
        value={newGoalTitle}
        onChange={(e)=>{setNewGoalTitle(e.target.value)}}
        style={{width: "100%", padding: "4px"}} />
        <button style={{marginTop: "9px"}}
        onClick={handleAddGoal}
        >Save goal</button>
      </div>
      <ul style={{ listStyle: "none", padding: 0}}>
        {goals.map(goal=>{
          return(
          <li style={{marginBottom: "9px"}}>
          <div style={{
            border: "solid 1px #ddd",
            padding: "19px",
            boxShadow: "0 3px 4px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
            borderRadius: "9px"
          }} >

            <h3>{goal.goalTitle}</h3>
            <button>View</button>
            <button style={{marginLeft: "9px"}}
             onClick={()=>{
              if(window.confirm("Are you sure?"))
                handleDeleteGoal(goal.id);
             }}>Delete</button>
          </div>
        </li>
          )
        })}
      </ul>
      
    </div>
  )

}

export default App;