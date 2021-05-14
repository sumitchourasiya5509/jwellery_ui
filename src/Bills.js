import React from 'react'
import { useLocation } from "react-router-dom";

function Bills() {
    const location = useLocation();
    console.log(location)
    return (
        <div>
            Hey {location.state.user.userName}
        </div>
    )
}

export default Bills
