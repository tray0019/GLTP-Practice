
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
      })
  },[])

  function handleAddGoal(){
    if(!newGoalTitle.trim()){
      alert("Enter goal title");
      return;
    }

    axios.post("http://localhost:8080/goals",{
      goalTitle: newGoalTitle
    })
      .then(res2=>{

        setNewGoalTitle("")

        axios.get("http://localhost:8080/goals")
      .then(res=>{
        setGoals(res.data);
      }).catch(err=>{
        console.error(err);
      });
    })
      .catch(err2=>{
        console.error(err2);
      })
  }

  function handleDelete(goalId){
    axios.delete("http://localhost:8080/goals/"+goalId)
      .then(()=>{
        axios.get("http://localhost:8080/goals")
      .then(res=>{
        setGoals(res.data);
      }).catch(err=>{
        console.error(err);
      });
    });
  }

  return(
    <div style={{ maxWidth: "600px", margin: "20px auto"}} >
      <h1>Goal</h1>
    <div style={{ marginBottom: "20px"}}>
      <h3>Add Goal</h3>
      <input
      type="text"
      placeholder="Enter goal title.."
      style={{ width: "100%", padding: "8px" }}
      value={newGoalTitle}
      onChange={function(e){
        setNewGoalTitle(e.target.value)
      }} />
      <button style={{marginTop: "10px"}}
      onClick={handleAddGoal} >Save Goal</button>
    </div>

    <ul style={{ listStyle: "none", padding: 0 }}>
      {goals.map(function(goal){
        return(
          <li key={goal.id} style={{ margin: "10px"}}>
          <div style={{
            border: "1px solid #ddd",
            boxShadow: "0 3px 5px rgba(0,0,0,0.1) ",
            padding: "16px",
            backgroundColor: "#fff",
            borderRadius: "20px"

          }} >
            <h3> {goal.goalTitle} </h3>
            <button>View</button>
            <button
            onClick={function(){
              if(window.confirm("Are you sure?")){
                handleDelete(goal.id)
              }
            }}
            style={{ marginLeft: "10px"}}
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