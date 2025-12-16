import {useEffect, useState} from "react";
import axios from "axios";

function App(){

  const [goals, setGoals] = useState([]);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [renmaeGoalTitle, setRenameGoalTitle] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/goals`)
      .then(res => {
        console.log("Api response:",res);
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
    }).then(function(res){
      console.log("Goal created", res.data);
      setNewGoalTitle("");

      axios.get("http://localhost:8080/goals")
      .then(function(res2){
        setGoals(res2.data);
      }).catch(function(err){
        console.error("error refreshing goals:",err);
      });
    }).catch(err => {
      console.error("Error creating goal:",err);
    });
  }

  function handleDeleteGoal(goalId){
    axios.delete("http://localhost:8080/goals/"+goalId)
      .then(function(){
        console.log("Goal deleted:",goalId);
        
        if(selectedGoal && selectedGoal.goalId === goalId){
            selectedGoal(null);
        }

        axios.get("http://localhost:8080/goals")
          .then(function(res){
            setGoals(res.data);
          }).catch(function (err){
            console.error("Eror refreshing goals:",err);
          });
      });
  }

  function handleView(goalId){
    axios.get("http://localhost:8080/goals/"+goalId)
      .then(function(res){
        console.log("Selected goal:",res.data);
      }).catch(function(err){
        console.error("Error fetching goal:",err);
      });
  }

  return( 
    <div style={{ maxWidth: " 800px", margin: "20px auto"}}>
      <h1>Goals</h1>
      <div style={{ marginBottom: "20px"}}>
        <h3>Add Goals</h3>
        <input
         type="text" 
         placeHolder="Enter goal title..."
         style={{ width: "100%", padding: "8px", boxSizing: "border-box"}}
         value={newGoalTitle}
         onChange={e => {setNewGoalTitle(e.target.value);}} />
         <button
         onClick={handleAddGoal}
         style={{ marginTop:"8px"}} >Save Goal</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0}}>
        {goals.map(goal=>  {
          return(
            <li>
              <div style={{
                border: "5px solid #ddd",
                padding: "25px",
                boxShadow: "0 5px 5px rgba(5,5,5,5.1)",
                backgroungColor: "#fff",
                borderRadius: "50px",
                margin: "15px"
              }}>

                <h3 style={{ margin: 0}}>{goal.goalTitle}</h3>
                <button>
                  View
                </button>
                <button
                 style={{marginLeft: "8px"}}
                 onClick={()=>{
                  if(window.confirm("Are you sure?"))
                    handleDeleteGoal(goal.id);
                 }} >
                  Delete
                </button>
                
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )


}

export default App;