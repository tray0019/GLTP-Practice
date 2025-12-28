import {useEffect, useState} from "react";
import axios from "axios";

function App(){

  const [goals, setGoals] = useState([]);
  const [newGoalTitle, setNewGoalTitle] = useState("");

  useEffect(()=>{
    axios.get("http://localhost:8080/goals")
      .then(res=>{
        setGoals(res.data);
      }).catch(err=>{
        console.error(err);
      });
  },[]);

  function handleDelete(goalId){

      axios.delete("http://localhost:8080/goals/"+goalId)
        .then(function(){
      axios.get("http://localhost:8080/goals")
      .then(res=>{
        setGoals(res.data);
      }).catch(err=>{
        console.error(err);
      });
        })
  }

  function handleAddGoal(){

    if(!newGoalTitle.trim()){
      alert("Enter goal Title");
      return;
    };

    axios.post("http://localhost:8080/goals",
      {goalTitle: newGoalTitle}
    ).then(()=>{
      setNewGoalTitle("")

      axios.get("http://localhost:8080/goals")
        
      .then(res=>{
        setGoals(res.data);
      }).catch(err=>{
        console.error(err);
      });

    }).catch(err2=>{
      console.error(err2);
      
    })
  }



  return(
    <div style={{ maxWidth: "600px", margin: "20px auto"}} >
    <h1>Goals</h1>
    <div style={{ marginBottom: "20px"}} >
      <h3>Add Goal</h3>
      <input
      type="text"
      placeholder="Add goal title..."
      value={newGoalTitle}
      onChange={function(e){setNewGoalTitle(e.target.value); }}
      style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} />
      <button style={{ marginLeft: "9px"}} 
      onClick={handleAddGoal}
      >Save Goal</button>
    </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {goals.map(function(goals){
            return(
              <li style={{ marginBottom: "12px"}} >
              <div style={{
               border: "8px solid #ddd",
               padding: "16px",
               boxShadow: "0 3px 4px rgba(0,0,0,0.1)",
               borderRadius: "9px",
               backgroundColor: "#fff"
 
          }} > <h3 style={{ margin: 0}} >{goals.goalTitle} </h3>
          <button>View</button>
          <button style={{marginLeft: "8px"}} 
          onClick={()=>{
            if(window.confirm("Are you sure?"))
              handleDelete(goals.id)
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