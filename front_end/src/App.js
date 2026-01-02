import {useEffect, useState} from "react";
import axios from "axios";

function App(){

  const [goals, setGoals] = useState([]);
  const [newGoalTitle, setNewGoalTitle] = useState("");

  function fetchGoals(){
    axios.get(`http://localhost:8080/goals`)
      .then(res=>{
          setGoals(res.data);
      }).catch(err=>{
        console.error(err);
      });
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
    }).then(res2=>{
        setNewGoalTitle("");
          fetchGoals();
      }).catch(err2=>{
        console.error(err2);
      });
  }

  function handleDelete(goalId){
    axios.delete(`http://localhost:8080/goals/${goalId}`)
      .then(res=>{
          fetchGoals();
      });
  }

  return(
    <div style={{ maxWidth: "600px", margin: "20px auto"}} >
      <h1>Goals</h1>
      <div style={{ marginBottom: "20px"}} > 
        <h3>Add Goal</h3>
        <input
        type="text" placeholder="Enter goal title..." value={newGoalTitle}
        onChange={(e)=>{setNewGoalTitle(e.target.value)}}
        style={{ width: "100%", padding: "8px"}} />
        <button style={{marginTop: "9px"}}
        onClick={handleAddGoal}
        >Save</button>

        <ul style={{ listStyle: "none", padding: 0}} >
          {goals.map(function(goal){
            return(
              <li style={{ marginBottom: "12px"}} >
                <div style={{
                  border: "1px solid #ddd",
                  padding: "16px",
                  boxShadow: "0 3px 5px rgba(0,0,0,0.1)",
                  backgroundColor: "#fff",
                  borderRadius: "20px"
                }} >

                  <h3>{goal.goalTitle}</h3>
                  <button>View</button>
                  <button style={{marginLeft: "10px"}} 
                  onClick={()=>{
                    if(window.confirm("Are you sure?")){
                      handleDelete(goal.id)
                    }
                  }}
                  >Delete</button>
                
                </div>
            </li>
            )
          })}

        </ul>
      </div>
    </div>
  )

}

export default App;