import axios from "axios";
import {useEffect, useState} from "react";


function App(){

  const [ goals, setGoals] = useState([]);
  const [ newGoalTitle, setNewGoalTitle] = useState("");
  const [ selectedGoal, setSelectedGoal] = useState(null);

  useEffect(res=>{
      axios.get("http://localhost:8080/goals")
      .then(res=>{
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
    }).then(res=>{
      console.log("Goal Created", res.data);
      setNewGoalTitle("");

      axios.get("http://localhost:8080/goals")
      .then(res2=>{
        setGoals(res2.data)
      }).catch(err2=>{
        console.error("Error refreshing goals:",err2);
      });
    }).catch(function(err){
      console.error("Error creating goal:",err);
    });

    
  }

  function handleDeleteGoal(goalId){
    axios.delete("http://localhost:8080/goals/"+goalId)
      .then(function(){
        console.log("Goal deleted:",goalId);
        
        if(selectedGoal && setSelectedGoal.goalId === goalId){
          setSelectedGoal(null);
        }
        axios.get("http://localhost:8080/goals")
      .then(res2=>{
        setGoals(res2.data)
      }).catch(err2=>{
        console.error("Error refreshing goals:",err2);
      });


      })

  }


  return(
    <div style={{ maxWidth: "600px", margin: "20px auto"}} >
      <h1>Goals</h1>
      <div style={{ marginBottom: "20px"}}>
        <h3>Add Goals</h3>
        <input
        type="text"
        value={newGoalTitle}
        onChange={ function(e){setNewGoalTitle(e.target.value);}}
        placeholder="Enter goal title..."
        style={{ width: "100%", padding: "8px", boxSizing: "border-box"}}
        />
        <button
        onClick={handleAddGoal}
        style={{ marginTop: "8px"}}
        >Save Goal</button>
      </div>

      <ul style={{ listStyle: "none", padding: "none"}}>
        {goals.map(goal=>{
          return(
            <li style={{ marginBottom: "12px"}}>
              <div style={{
                border: "2px solid #ddd",
                padding: "16px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                backgroundColor: "#fff",
                borderRadius: "20px"
              }}>
                <h3 style={{ margin: 0}}>{goal.goalTitle}</h3>
                <button>View</button>
                <button style={{ marginLeft: "10px"}}
                onClick={function(){

                  if(window.confirm("Are you sure?"))
                    handleDeleteGoal(goal.id);
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