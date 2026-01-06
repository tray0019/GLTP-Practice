import {useEffect, useState} from "react";
import axios from "axios";

function App(){

  const [goals, setGoals] = useState([]);
  const [newGoalTitle, setNewGoalTitle] = useState("");

  function fetchGoal(){
    axios.get(`http://localhost:8080/goals`)
      .then(res2=>{
        setGoals(res2.data);
      }).catch(err2=>{
        console.error(err2);
      })
  }

  useEffect(()=>{
    fetchGoal();
  },[])

  function handleAddGoal(){

    if(!newGoalTitle.trim()){
      alert("Enter goal title");
      return;
    }

    axios.post(`http://localhost:8080/goals`,{
      goalTitle: newGoalTitle
    }).then(res=>{
      console.log(res);
      fetchGoal();     
    }).catch(err=>{
      console.error(err);
    })
  }

  function handleDelete(goalId){
    axios.delete(`http://localhost:8080/goals/${goalId}`)
      .then(()=>{
        fetchGoal();
      })
  }

  return(
    <div style={{maxWidth: "600px", margin: "19px auto"}} >
      <h1>Goals</h1>
      <div style={{padding: 0}} >
        <h3>Add Goal</h3>
        <input style={{ width: "100%", padding: "5px" }} 
        placeholder="Enter goal title"
        value={newGoalTitle}
        onChange={(e)=>{setNewGoalTitle(e.target.value)}} />
        <button style={{marginTop:"9px"}} 
        onClick={handleAddGoal} >Save</button>
      </div>

      <ul style={{listStyle: "none", padding: 0}} >  
        {goals.map(goal=>{
          return(
            <li style={{marginBottom: "9px"}} >
            <div style={{
              border: "1px solid #ddd",
              boxShadow: "0 3px 5px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "10px"
            }} >
              <h3>{goal.goalTitle}</h3>
              <button>View</button>
              <button style={{marginLeft: "9px"}}
              onClick={function(){if(window.confirm("Are you sure?"))
                {handleDelete(goal.id)}
              }}
               >Delete</button>

            </div>
          </li>
          )
        })}
      </ul>
    </div>
  )

}

export default App;