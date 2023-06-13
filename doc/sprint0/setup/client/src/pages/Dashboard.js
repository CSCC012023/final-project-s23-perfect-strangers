import React from "react";
import { Link } from 'react-router-dom';
function Dashboard(){
    return(
        <>
            <div className="page-title">
                <h1>EVENTS</h1>
                <div className="create-event">
                    <Link to="/invites">
                        <button id="create-button">Create</button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Dashboard;