
import { useEffect, useState} from "react";
import axios from "axios";


function App(){

  const [goals, setGoals] = useState([]);
  const [ newGoalTitle, setNewGoalTitle] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [renameGoalTitle, setRenameGoal] = useState("");


useEffect(function(){
  axios.get("http://localhost:8080/goals")
  .then(res=>{
    console.log("Api response:", res.data);
    setGoals(res.data);    
  }).catch(err=>{
    console.error(err);
  })
})

function handleAddGoal(){
  if(!newGoalTitle.trim()){
    alert("Please enter a goal title.");
    return;
  }

  axios.post("http://localhost:8080/goals",{
    goalTitle: newGoalTitle
  }).then(res=>{
    console.log("Goal created",res.data);
    setNewGoalTitle("");

    axios.get("http://localhost:8080/goals")
    .then(res2 =>{
      setGoals(res2.data);
    }).catch( err2=>{
      console.error("Error refreshing goals:",err2);
    });
  }).catch(err => {
    console.error("Error creating goal:",err);
  });
}

function handleDeleteGoal(goalId){
  axios.delete("http://localhost:8080/goals/"+goalId)
    .then(()=>{
      console.log("Goal deleted:".goalId);

      if(selectedGoal && selectedGoal.goalId === goalId){
        setSelectedGoal(null);
      }
      
      axios.get("http://localhost:8080/goals")
    .then(res2 =>{
      setGoals(res2.data);
    }).catch( err2=>{
      console.error("Error refreshing goals:",err2);
    });

    });
}


  return(
    <div style={{ maxWidth: "600px", margin: "20px auto"}}>
      <h1>Goals</h1>
      <div style={{ marginBottom: "10px"}}>
        <h3>Add Goal</h3>
        <input
        type="text"
        placeHolder="Enter goal title..."
        onChange={function (e) {setNewGoalTitle(e.target.value);}}
        style={{ width:"100%", padding: "8px", boxSizing:"border-box"}}
        />
      <button
      onClick={handleAddGoal} style={{ marginTop: "10px"}}
      >Save Goal</button>

      </div>

      <ul style={{ listStyle: "none", padding: 0}}>
    {goals.map(goal=>{
      return(
        <li key={goal.id} style={{ marginBottom: "12px"}}>
          <div style={{ 
            border: "2px solid #ddd",
            padding: "16px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            borderRadius: "15px"
            }}>

        <h3 style={{ margin: 0}}>{goal.goalTitle}</h3>
        <button>View</button>
         <button>Rename</button>
         <button
         style={{ marginLeft: "10px"}}
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