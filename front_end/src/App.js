import {useState, useEffect} from "react";
import axios from "axios";


function App(){

  const [goalss, setGoallss] = useState([]);
  const [goalTitle, setGoalTitle] = useState("");

  function fetchGoal(){
    axios.get(`http://localhost:8080/goals`)
      .then(res2=>{
        setGoallss(res2.data)
      }).catch(err2=>{
        console.error(err2);
      });
  }

  useEffect(()=>{
    fetchGoal();
  },[]);

  function handleAddGoal(){

    if(!goalTitle.trim()){
      alert("Enter goal title");
    }
    axios.post(`http://localhost:8080/goals`,{
      goalTitle: goalTitle
    }).then(()=>{
      fetchGoal();
    }).catch(err=>{
      console.error(err);
    });
  }

  function deleteGoal(goalId){
    axios.delete(`http://localhost:8080/goals/${goalId}`)
      .then(()=>{
        fetchGoal();
      })
  }

  return(
    <div style={{maxWidth: "600px", margin: "20px auto"}}>
      <h1>Goals</h1>
      <div style={{padding: 0}} >
        <h3>Add Goal</h3>
        <input style={{width: "100%", padding: "3px"}}
        placeholder="Enter goal title..."
        value={goalTitle}
        onChange={(e)=>{setGoalTitle(e.target.value)}} />
        <button style={{marginTop: "9px"}}
        onClick={handleAddGoal} >Save</button>
      </div>
      <ul style={{listStyle: "none", padding: 0}} >
        {goalss.map(goal=>{
          return(
            <li style={{ marginBottom: "9px"}}>
              <div style={{
                border: "1px solid #ddd",
                padding: "10px",
                boxShadow: "0 3px 5px rgba(0,0,0,0.1)",
                borderRadius: "9px"
              }}>
                <h3>{goal.goalTitle}</h3>
                <button>View</button>
                <button style={{marginLeft: "9px"}} 
                onClick={()=>{
                  if(window.confirm("Are you sure?")){
                    deleteGoal(goal.id);
                  }
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