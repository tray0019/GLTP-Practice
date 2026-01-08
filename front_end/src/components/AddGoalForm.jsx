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
    
}

export default AddGoalForm;