import {useEffect, useState} from "react";
import axios from "axios";

function App() {

  const [goals, setGoals] = useState([]);

  useEffect(function(){
    axios.get("http://localhost:8080/goals")
    .then(res => {
      console.log("Api response:", res.data);
      setGoals(res.data);
    }).catch(err => {
      console.error(err);
      
    });
  },[]);
  
  return (
    <div style={{ maxWidth: "600px", margin: "20px auto"}}>
      <h1>Goals</h1>
      <div style={{ marginBottom: "20px"}}>
        <h3>Add Goal</h3>
        <input
          type="text"
          placeholder="Enter goal title..."
          style={{}}
        />
        <button 
          style={{}} >
          Save Goal
        </button>
      </div>

    <ul style={{ listStyle: "none", padding: 0  }}>
      {goals.map(function (goal){
        return (
          <li key={goal.id} style={{}}>
              <div style={{
                border: "1px solid #ddd",
                padding: "16px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1",
                backgroundColor: "#fff",
                borderRadius: "20px"
              }}>
                <h3 style={{ margin: 0}}>{goal.goalTitle}</h3>
                <button>
                  View
                </button>
                <button>
                  Rename
                </button>
                <button>
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
