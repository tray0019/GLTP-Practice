import {useEffect, useState} from "react";
import axios from "axios";

function App(){

  const [ goals, setGoals] = useState([]);
  const [ newGoalTitle, setNewGoalTitle ] = useState("");

  useEffect(()=>{
    axios.get("http://localhost:8080/goals")
      .then(res=>{
        setGoals(res.data);
      }).catch(err =>{
        console.error(err);
      });
  },[]);

  function handleDelete(goalId){
    axios.delete("http://localhost:8080/goals/"+goalId)
      .then(()=>{
         axios.get("http://localhost:8080/goals")
      .then(res=>{
        setGoals(res.data);
      }).catch(err =>{
        console.error(err);
      });
    });
  }

  function handleAdd(){
    if(!newGoalTitle.trim()){
      alert("Enter goal title");
      return;
    }

    axios.post("http://localhost:8080/goals",
      {goalTitle: newGoalTitle}
    )
      .then(()=>{
        setNewGoalTitle("")

      axios.get("http://localhost:8080/goals")
      .then(res2=>{
        setGoals(res2.data);
      }).catch(err2 =>{
        console.error(err2);
      });

      }).catch(err =>{
        console.error(err);
      });


  }

  return(
    <div style={{ maxWidth: "600px", margin: "20px auto"}} >
      <h1>Goals</h1>
      <div style={{ marginBottom: "20px"}} >
        <h3>Add Goal</h3>
        <input
        type="text"
        placeholder="Enter goal title..."
        style={{ width: "100%", padding: "8px"}}
        value={newGoalTitle}
        onChange={function(e){
          setNewGoalTitle(e.target.value)
        }}
        />
        <button style={{ marginTop: "10px" }} 
        onClick={handleAdd}
        >Save Goal</button>
      </div>

      <ul style={{listStyle:"none", padding: 0}}>
        {goals.map(goal=>{
          return(
            <li style={{ marginBottom: "10px"}} >
              <div style={{
                border:"2px solid #ddd",
                padding: "20px",
                boxShadow: "0 4px 5px rgba(0,0,0,0.1)",
                borderRadius: "12px",
                backgroundColor: "20px"
              }} >

              <h3 style={{ margin: 0}} >{goal.goalTitle}</h3>
              <button>View</button>
              <button style={{marginLeft: "10px"}} 
              onClick={function(){
                if(window.confirm("Are you sure"))
                  handleDelete(goal.id)
              }}  >Delete Goal</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )

}

export default App;