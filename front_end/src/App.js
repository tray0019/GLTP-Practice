import {useEffect, useState} from "react";
import axios from "axios";

function App(){

  const [goals, setGoals] = useState([]);
  const [newGoalTitle, setNewGoalTitle] = useState("");

  function fetchGoal(){
    axios.get(`http://localhost:8080/goals`)
      .then(res=>{
        setGoals(res.data);
      }).catch(err=>{
        console.error(err);
      })
  }

  useEffect(()=>{
      fetchGoal();
  })

  function handleDeleteGoal(goalId){
    axios.delete(`http://localhost:8080/goals/${goalId}`)
      .then(()=>{
        fetchGoal();
      });
  }

  function handleAddGoal(){

    if(!newGoalTitle.trim()){
      alert("Enter goal title");
      return;
    }

    axios.post(`http://localhost:8080/goals`,{
      goalTitle: newGoalTitle
    }).then(()=>{
      fetchGoal();
    }).catch(err2=>{
      console.error(err2);
    });
  }



  return(
  <div style={{ maxWidth: "600px", margin: "20px auto"}}>
    <h1>Goal</h1>
    <div style={{
      marginBottom: "20px"
    }}>
      <h3>Add Goal</h3>
      <input 
      type="text"
      placeholder="Enter goal title..."
      value={newGoalTitle}
      onChange={(e)=>{
        setNewGoalTitle(e.target.value)
      }}
      style={{ width: "100%"}}
      />
      <button style={{marginTop: "9px"}} 
      onClick={handleAddGoal}
      >Save</button>
    </div>

    <ul style={{listStyle: "none", padding: 0}} >
      {goals.map(goal=>{
        return(
          <li style={{marginBottom: "9px"}}>
            <div style={{
              border: "1px solid #ddd", padding: "20px",
              boxShadow: "0 3px 5px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              borderRadius: "10px"
            }}>
              <h3 style={{margin:0}}>{goal.goalTitle}</h3>
              <button>View</button>
              <button style={{ marginLeft: "9px"}}
              onClick={()=>{
                if(window.confirm("Are you sure?")){
                  handleDeleteGoal(goal.id)
                }
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