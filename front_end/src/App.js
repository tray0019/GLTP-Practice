
import {useEffect, useState} from "react";
import axios from "axios";

function App(){

  const [ goals, setGoals] = useState([]);
  const [ newGoalTitle, setNewGoalTitle] = useState("");
  const [ selectedGoal, setSelectedGoal] = useState(null);


  useEffect (function(){

    axios.get("http://localhost:8080/goals")
      .then(res=>{
        console.log("Api response", res.data);
        setGoals(res.data);
      }).catch(err=>{
        console.error(err);
      });
  },[]);

  function handleAddGoal(){
    if(!newGoalTitle.trim()){
      alert("Please enter goal title.");
      return;
    }

    axios.post("http://localhost:8080/goals",{
      goalTitle: newGoalTitle
    }).then(res=>{
      console.log("Goal crated", res.data);
      setNewGoalTitle("");

      axios.get("http://localhost:8080/goals")
        .then(res2=>{
          setGoals(res2.data);
        }).catch(err => {
          console.error("Error refreshing goals:",err);
        });
    }).catch(err2=>{
      console.error("Error refreshing goals:",err2);
    });
  }

  function handleDeleteGoal(goalId){
    axios.delete("http://localhost:8080/goals/"+goalId)
      .then(()=>{
        console.log("Goal deleted:",goalId);
        
        if(selectedGoal && selectedGoal.goalId === goalId){
          setSelectedGoal(null);
        }

        axios.get("http://localhost:8080/goals")
        .then(res2=>{
          setGoals(res2.data);
        }).catch(err => {
          console.error("Error refreshing goals:",err);
        });

      })
  }

  return(
    <div style={{ maxWidth: "550px", margin: "20px auto"}}>
      <h1>Goals</h1>
      <div style={{ marginBottom: "15px"}}>
        <h3>Add Goal</h3>
        <input 
          type="text"
          placeholder="Enter goal title..."
          value={newGoalTitle}
          onChange={function(e){setNewGoalTitle(e.target.value);}}
          style={{ width: "100%", padding: "10px", boxSizing: "border-box"}}
           />
           <button
           onClick={handleAddGoal}
           >Save Goal</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0}}>
        {goals.map(goal=>{
          return(
            <li style={{ marginBottom: "12px"}}>
              <div style={{
                border:"1px solid #ddd",
                padding: "15px",
                boxShadow: "0 5px 5px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
                borderRadius: "20px"
              }}
              >
                <h3 style={{ margin: 0}}>{goal.goalTitle} </h3>
                <button>View</button>
                <button 
                onClick={function(){
                  if(window.confirm("Are you sure?"))
                    handleDeleteGoal(goal.id);
                }}
                style={{ marginLeft: "10px"}}>Delete</button>
              </div>
            </li>
          )
        })}
      </ul>
      
    </div>
  )

  


}

export default App;