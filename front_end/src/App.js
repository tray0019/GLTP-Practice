import {useEffect, useState} from "react";
import axios from "axios";

function App(){
  
  const [goals, setGoals] = useState([]);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [selectedGoal, setSelectedGoal] = useState([]);

  useEffect(function(){
    axios.get("http://localhost:8080/goals")
    .then(res=>{
      console.log("Fetch api", res.data);
      setGoals(res.data);
    }).catch(err =>{
      console.error(err);
    });
  },[])

  function handleAddGoal(){
    if(!newGoalTitle.trim){
      alert("Enter goal title");
      return;
    }

    axios.post("http://localhost:8080/goals",{
      goalTitle: newGoalTitle
  })
      .then(res=>{
      console.log("Goal created", res.data);
      setNewGoalTitle("");

      axios.get("http://localhost:8080/goals")
    .then(res2=>{
      console.log("Fetch api", res2.data);
      setGoals(res2.data);
    }).catch(err2 =>{
      console.error(err2);
    });
      

    }).catch(err =>{
      console.error(err);
    })
  }

  function handledelete(goalId){

      axios.delete("http://localhost:8080/goals/"+goalId)
        .then(res=>{
          console.log("Goal deleted",res.data);
          
          axios.get("http://localhost:8080/goals")
    .then(res2=>{
      console.log("Fetch api", res2.data);
      setGoals(res2.data);
    })
        }).catch(err =>{
          console.error(err);
        })
  }

  return(

    <div style={{ maxWidth: "600px", margin:"20px auto"}}>
      <h1>Goals</h1>
      <div style={{ marginBottom: "10px"}}>
        <h3>Add Goals</h3>
        <input type="text"
        placeholder="Enter goal title..."
        value={newGoalTitle}
        onChange={function(e){setNewGoalTitle(e.target.value)}}
        style={{ width:"100%", padding: "10px", boxSizing: "border-box"}} />
        <button style={{ marginTop: "10px"}}
        onClick={handleAddGoal}
        >Save Goal</button>
      </div>
      
      <un style={{ listStyle: "none", padding: 0}}>

        {goals.map(function(goal){
          return(
           <li style={{ marginBottom: "12px"}}>
             <div style={{
              border: "2px solid #ddd",
              padding: "16px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              borderRadius: "10px",
              backgroundColor: "#ffff"
            }}>
              
                <h3 style={{margin: 0}}>{goal.goalTitle} </h3>
              
              <button>View</button>
              <button style={{marginLeft: "10px"}}
              onClick={function(){
                if(window.confirm("Are you sure?"))
                  handledelete(goal.id);
              }}
              >Delete</button>
            </div>
           </li>

          )
        })}
        

      </un>

    </div>

  )

}

export default App;