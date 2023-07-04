import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

import styles from "../styles/common_styles.module.css";
import eventStyles from "../styles/event.module.css";
import jwt_decode from "jwt-decode";

function UserCreatedEvents() {  
    // use token to get user email
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const [eventIDs, setEventIDs] = useState([]);
    const [events, setEvents] = useState([]);
    
    
    // retrieve event ids then retrieve the events themselves in the nested request
    useEffect(() => {
        Axios.get("http://localhost:5000/api/userevents/" + decoded.email).then((response) => {
            setEvents(response.data);
            console.log(response.data);
        });
    }, []);

    useEffect(() => {
        console.log(`http://localhost:5000/api/userevents/${eventIDs.map((n, index) => `eventList[${index}]=${n}`).join('&')}`);
        Axios.get(`http://localhost:5000/api/userevents/${eventIDs.map((n, index) => `eventList[${index}]=${n}`).join('&')}`).then((response) => {
            setEvents(response.data);
        });
    }, [eventIDs]);


    return(
        <div className={styles.rightContainer}>
            <div className={styles.wrapContainer}>
                {events &&
                events.map((event) => (
                    <>
                    <div key={event._id} className={eventStyles.eventDetails}>
                        <div className={eventStyles.eventPhoto}>
                        <p>Photo</p>
                        </div>
                        <div className={styles.verticalContent}>
                        <h1 className={styles.boldtext}>{event.title}</h1>
                        <p className={styles.smalltext}>{event.date}</p>
                        <p className={styles.smalltext}>{event.location}</p>
                        <p className={styles.smalltext}>from ${event.price}</p>

                        </div>
                    </div>
                    <br></br>
                    </>
                ))}
            </div>
        </div>
    )
}

export default UserCreatedEvents;