    import React from "react";
    import { Link } from "react-router-dom";
    import { useEffect, useState } from "react";
    import Axios from "axios";

    import styles from "../styles/common_styles.module.css";
    import EventItem from "../pages/EventItem";
    import jwtDecode from 'jwt-decode';

function AttendingEvents() {
    const token = jwtDecode(localStorage.getItem("token"));
    console.log(token);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:5000/requests/accepted/" + token.id).then((response) => {
            setRequests(response.data);
            console.log(response.data);
        });
    }, []);


    return (

        <div className={styles.rightContainer}>
        <div className={styles.horizontalContent}>
            <div className={styles.squishHeading}>
                EVENTS
            </div>
            <div className={styles.smallDivision}>
            <div className={styles.verticalContent}>
                <input 
                type="text" 
                placeholder="Search"
                className={styles.inputMin}>
                </input>
                <Link 
                to="/create-events">
                <button className={styles.purpleButton}>
                    + Create
                </button>
                </Link>
            </div>
            </div>
        </div>
        <div className={styles.wrapContainer}>
            {requests &&
            requests.map((event) => (
                <div key={event._id} style={{margin: "10px"}}>
                <EventItem event={event.event} />
                </div>
            ))}
        </div>

        </div>

    );
}

export default AttendingEvents;
