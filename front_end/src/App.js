import {useEffect, useState} from "react";
import axios from "axios";

function App(){
  const [goals, setGoals] = useState([]);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [renameGoalTitle, setRenameGoalTitle] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null)

  useEffect(()=>{
    axios.get("http://localhost:8080/goals")
      .then(res=> {
        console.log("Api response:",res.data);
        setGoals(res.data);
      }).catch(function(err){
        console.error(err);
      });
  },[]);

  function handleAddGoal(){

    if(!newGoalTitle.trim()){
      alert("Please enter a goal title.");
      return;
    }

      axios.post("http://localhost:8080/goals",{
        goalTitle: newGoalTitle
      }).then(function(res){
        console.log("Goal created", res.data);
        setNewGoalTitle("")
        
        axios.get("http://localhost:8080/goals")
        .then(function(res2){
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
        console.log("Goal deleted:",goalId);
        
        if(selectedGoal && selectedGoal.goalId === goalId){
            setSelectedGoal(null);
        }

        axios.get("http://localhost:8080/goals")
          .then(function(res){
            setGoals(res.data);
          }).catch(function(err){
            console.error("Error refreshing goals", err);
          });
      });
  }



  return(
    <div style={{ maxWidth: "500px", margin: "15px auto"}}>
      <h1>Goals</h1>
      <div style={{ marginBottom: "15px"}}>
        <h3>Add Goal</h3>
        <input 
        type="text"
        value={newGoalTitle}
        onChange={function (e){setNewGoalTitle(e.target.value);}}
        placeHolder= "Enter new goal title... " 
        style={{width: "100%", padding: "10px", boxSizing: "border-box"}} />

      <button
        onClick={handleAddGoal}
        style={{ marginTop: "8px"}} >
        Save Goal
      </button>
      </div>

    <ul style={{ listStyle: "none", padding: 0}}>
      {goals.map(goal=>{
        return(
          <li key={goal.id} style={{ marginBottom: "12px"}}>
            <div style={{
              border: "5px solid #ddd",
              padding: "10px",
              boxShadow: "2 2px 2px rgba(0,0,0,0.2)",
              backgroundColor:"#fff",
              borderRadius: "15px"
            }}>
              <h3 style={{ margin: 0}}>{goal.goalTitle}</h3>
              <button>
                View
              </button>
              <button
               style={{ marginLeft: "10px"}} >
                Rename
              </button>
              <button
               style={{ marginLeft: "10px"}}
               onClick={()=>{
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