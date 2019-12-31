import React from "react";

import './ErrorMessage.css'

export default function ErrrorMessage ({ errorMessage }){
    return(
        <div className="error-message">{ errorMessage }</div>
    )
}