import React, { useState } from "react";

function AddGoalForm({ onAdd }){

    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if(!title.trim()){
            alert("Please enter goal title.");
            return;
        }

        onAdd(title.trim());
        setTitle("");
    };

    return(
        <div>
            <h3>Add Goal</h3>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder="Enter goal title..."
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                 />
                 <button type="submit" >Save</button>
            </form>
        </div>
    )
    
}

export default AddGoalForm;