import {useEffect, useState} from "react";
import axios from "axios";

function App(){

  const [goals, setGoals] = useState([]);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);


  useEffect(function(){
    axios.get("http://localhost:8080/goals")
      .then(res=>{
        console.log("Api response:",res.data);
        setGoals(res.data);
      }).catch(err=>{
        console.error(err);
        
      });
  },[])

  function handleAddGoal(){

    if(!newGoalTitle.trim){
      alert("Please enter a goal title.")
      return;
    }

    axios.post("http://localhost:8080/goals",{
        goalTitle: newGoalTitle 
    }).then(res=>{
      console.log("Goal created",res.data);
      setNewGoalTitle("");

      axios.get("http://localhost:8080/goals")
      .then(res=>{
        setGoals(res.data);
      }).catch(err=>{
        console.error("Error refreshing goals:",err);
      });
    }).catch(err=>{
      console.error("Error creating goal:",err);
    });
  }

  function handleDeleteGoal(goalId){
    axios.delete("http://localhost:8080/goals/"+goalId)
      .then(res=>{
        console.log("Goal deleted:",goalId);
        
        if(selectedGoal && selectedGoal.goalId === goalId){
          setSelectedGoal(null);
        }

        axios.get("http://localhost:8080/goals")
      .then(res=>{
        setGoals(res.data);
      }).catch(err=>{
        console.error("Error refreshing goals:",err);
      });



      })
  }


  return(
    <div style={{ maxWidth: "600px", margin: "20px auto"}}>
      <h1>Goals</h1>
      <div style={{ marginBottom: "20px"}}>
        <h3>Add Goals</h3>
        <input
        type="text"
        placeholder="Enter goal title..."
        value={newGoalTitle}
        onChange={function(e){setNewGoalTitle(e.target.value)}}
        style={{ width: "100%", padding: "8px", boxSizing: "border-box"}}
        />

        <button
        onClick={handleAddGoal}
        >Save Goal</button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {goals.map(goal=>{
          return(
            <li style={{ marginBottom: "12px"}}>
              <div
              style={{ 
                border:" 2px solid #ddd",
                padding: "16px",
                boxShadow: "0 5px 5px rgba(0,0,0,0.1)",
                backGroundColor: "#fff",
                borderRadius: "20px"
                }} >
                  <h3>{goal.goalTitle}</h3>
                  <button>View</button>
                  <button style={{ marginLeft: "10px"}}
                  onClick={function(){
                    if(window.confirm("Are you sure?"))
                      handleDeleteGoal(goal.id)
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