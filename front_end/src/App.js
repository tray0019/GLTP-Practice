import {useEffect, useState} from "react";
import axios from "axios";

function App(){

  const [goals, setGoals] = useState([]);
  const [newGoalTitle, setGoalTitle] = useState("");

  useEffect(function(){
    axios.get("http://localhost:8080/goals")
      .then(res=>{
        setGoals(res.data);
      }).catch(err=>{
        console.error(err);
      });
  },[]);

  function handleAddGoal(){
    if(!newGoalTitle.trim()){
      alert("Enter goal title");
      return;
    }

    axios.post("http://localhost:8080/goals",
      {goalTitle: newGoalTitle})
      .then(()=>{
        setGoalTitle("");

        axios.get("http://localhost:8080/goals")
      .then(res=>{
        setGoals(res.data);
      }).catch(err=>{
        console.error(err);
      });
      }).catch(err2=>{
        console.error(err2);
      });
    }

    function handleDeleteGoal(goalId){

      axios.delete("http://localhost:8080/goals/"+goalId)
        .then(res=>{
          console.log("deleted",res.data);
          axios.get("http://localhost:8080/goals")
      .then(res=>{
        setGoals(res.data);
      })
        }).catch(err2=>{
        console.error(err2);
      });





  }


  return(
    
  <div style={{ maxWidth: "600px", margin: "20px auto"}}>
    <h1>Goals</h1>
    <div style={{ marginBottom: "20px"}} >
      <h3>Add Goal</h3>
      <input  style={{padding:"8px", width: "100%"}}
      type= "text"
      placeholder= "Enter goal title..."
      value={newGoalTitle}
      onChange={function(e){setGoalTitle(e.target.value)}}/>
      <button style={{ marginTop: "9px"}} 
      onClick={handleAddGoal}  >Save Goal</button>
    </div>
    
    <ul style={{ listStyle: "none", padding: 0 }} >
      {goals.map(goal=>{
        return(
          
        <li style={{ marginBottom: "12px"}}>
          <div style={{
          padding: "16px",
           border: "2px solid #ddd",
           boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
           backgroundColor: "#fff",
           borderRadius: "20px"}}>

          <h3 style={{ margin: 0}} >{goal.goalTitle}</h3>
          <button>View</button>
          <button
          style={{ marginLeft: "8px"}}
          onClick={function(){
            if(window.confirm("Are you sure?")){
              handleDeleteGoal(goal.id)
            }
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