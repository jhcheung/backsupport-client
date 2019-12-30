import React from "react";

import './ErrorMessage.css'

export default function ErrrorMessage ({ message }){
    return(
        <div className="error-message">{ message }</div>
    )
}