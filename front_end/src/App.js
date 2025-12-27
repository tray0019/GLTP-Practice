
import {useEffect, useState} from "react";
import axios from "axios";

function App(){

  const [goals, setGoals] = useState([]);
  const [newGoalTitle, setNewGoaltitle] = useState("");

  useEffect(function(){
    axios.get("http://localhost:8080/goals")
      .then(res=>{
        console.log("Api:",res.data);
        setGoals(res.data);
      }).catch(err=>{
        console.error(err);
      });
  },[]);

  function handleDelete(goalId){
    axios.delete("http://localhost:8080/goals/"+goalId)
      .then(()=>{
        
        
        axios.get("http://localhost:8080/goals")
      .then(res=>{
        console.log("Api:",res.data);
        setGoals(res.data);
      }).catch(err=>{
        console.error(err);
      });
      });
  }

  function handleAddGoal(){
    if(!newGoalTitle.trim()){
      alert("Please enter goal title");
      return;
    }
    axios.post("http://localhost:8080/goals",
      {goalTitle: newGoalTitle

      }).then(res=>{
      console.log("Goal created:",res.data);
      setNewGoaltitle("");

      axios.get("http://localhost:8080/goals")
      .then(res2=>{
        setGoals(res2.data);
      }).catch(err2=>{
        console.error(err2);
      });
    }).catch(err=>{
      console.error(err);
    });
  }

  return(
    <div style={{ maxWidth: "600px", margin: "20px auto"}}>
      <h1>Goals</h1>
      <div style={{marginBottom: "20px"}} >
      <h3>Add Goal</h3>
      <input 
      type="text"
      placeholder="Enter goal title..."
      value={newGoalTitle}
      onChange={e=>{setNewGoaltitle(e.target.value)}}
      style={{ width: "100%", padding: "8px" }}
       />
      <button style={{ marginTop: "9px"}} 
      onClick={handleAddGoal}
      >Save Goal</button>
      </div>

      <ul style={{listStyle: "none", padding: 0}}>
        {goals.map(function(goal){ 
          return(
            <li style={{ marginBottom: "12px"}}>
            <div style={{ 
              border: " 5px solid #ddd",
              backgroundColor: "#fff",
              boxShadow: "0 4px 4px rgba(0,0,0,0.1)",
              padding: "16px",
              borderRadius: "10px" }} >

                <h3 style={{ margin: 0}}>{goal.goalTitle}</h3>

                <button>View</button>
                <button style={{marginLeft: "10px"}} 
                 onClick={function(){
                  if(window.confirm("Are you sure?"));
                  handleDelete(goal.id)
                 }} >Delete</button>
            </div>

          </li>
          )
        })}

      </ul>

      

    </div>
  )

}

export default App;



