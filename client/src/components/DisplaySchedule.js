import React from "react";
import {formatPhoneNumber} from "../utils";


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
            <p>Phone number: {formatPhoneNumber(phoneNumber)} </p>
        </div>
    );
};


export default Display;