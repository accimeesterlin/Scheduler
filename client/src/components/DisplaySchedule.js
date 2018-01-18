import React from "react";


const Display = ({ 
    current_user: { 
        hour, 
        info: { 
            name, 
            phoneNumber 
        } 
    } 
}) => {
    return (
        <div>
            <h2>You picked!</h2>
            <h4>Name: {name}</h4>
            <p>Hour Selected: {hour} </p>
            <p>Phone number: {phoneNumber} </p>
        </div>
    );
};


export default Display;