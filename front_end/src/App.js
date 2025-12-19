import axios from "axios";
import {useEffect, useState} from "react";


function App(){

  const [goals, setGoals] = useState([]);
  const [newGoalTItle, setNewGoalTitle] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [renameGoalTitle, setRenameGoalTitle] = useState("");

  useEffect(function(){
    axios.get("http://localhost:8080/goals")
    .then(res=>{
      setGoals(res.data);
    }).catch(function(err){
      console.error(err);
    });
  });

  function handleAddGoal(){
    if(!newGoalTItle.trim()){
      alert("Please enter a goal title.");
      return;
    }

    axios.post("http://localhost:8080/goals",{
      goalTitle: newGoalTItle
    }).then(function(res){
      console.log("Goal Created", res.data);
      setNewGoalTitle("");

      axios.get("http://localhost:8080/goals")
      .then( res2=> {
        setGoals(res2.data);
      }).catch(function(err2){
        console.error("Error refreshing goals:", err2);
      });
    }).catch(function(err){
      console.error("Error creating goal:",err);
    });
  }

  function handleDeleteGoal(goalId){
    axios.delete("http://localhost:8080/goals/"+goalId)
    .then(function(){
      console.log("Goal deleted:", goalId);
      
      if(selectedGoal && selectedGoal.goalId === goalId){
        setSelectedGoal(null);
      }

      axios.get("http://localhost:8080/goals")
      .then(function(res){
        setGoals(res.data);
      }).catch(function(err){
        console.error("Error refreshing goals:",err);
        
      });
    })
  }

  return(
    <div style={{ maxWidth: "600px", margin: "20px auto"}}>
      <h1>Goals</h1>
      <div style={{ marginBottom: "20px"}}>
        <h3>Add Goal</h3>
        <input
        type="text"
        onChange={function(e) {setNewGoalTitle(e.target.value)}}
        value={newGoalTItle}
        placeHolder="Enter goal title..."
        />
        <button style={{ marginTop: "4px"}}
        
        onClick={handleAddGoal}

        >
          Save Goal
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0}}>
        {goals.map(goal=>{
          return(
            <li style={{ marginBottom: " 10px"}}>
              <div style={{
                border: "3px solid #ddd",
                padding: "20px",
                baxshadow: " 0 3px 3px rgba(0,0,0,0.2)",
                backgroundColor: "#fff",
                borderRadius: "15px"
              }}>
                <h3 style={{ margin: 0}}>{goal.goalTitle}</h3>
                <button>
                  View
                </button>

                <button>
                  Rename
                </button>

                <button 
                 onClick={function(){
                  if(window.confirm("Are you sure?"))
                    handleDeleteGoal(goal.id);
                 }} >
                  Delete
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )


}

export default App; 