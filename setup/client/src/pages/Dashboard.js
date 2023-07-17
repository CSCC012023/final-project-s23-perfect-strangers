import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

import styles from "../styles/common_styles.module.css";
import EventItem from "./EventItem";
import Popup from "../CommonItems/Popup";

import jwtDecode from "jwt-decode";

function Dashboard() {
    const [events, setEvents] = useState([]);

    function _arrayBufferToBase64(buffer) {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }

    useEffect(() => {
        Axios.get("http://localhost:5000/api/userevents").then(response => {
            setEvents(response.data);
            console.log(response.data);
            localStorage.setItem(
                "eventPic",
                _arrayBufferToBase64(response.data.image.data.data)
            );
        });
    }, []);

    const Content = (event, close) => {
        const token = jwtDecode(localStorage.getItem("token"));

        const [processed, setProcessed] = useState(false);
        const [processedMessage, setProcessedMessage] = useState("test");

        const makeRequest = () => {
            Axios.post("http://localhost:5000/requests/", {
                requester: token.id,
                event: event._id,
            }).then(res => {
                setProcessed(true);
                setProcessedMessage(res.data.msg);
            });
        };

        return (
            <>
                {token.id === event.creator ? (
                    <div className={styles.text}>this is your event</div>
                ) : processed ? (
                    <div className={styles.text}>{processedMessage}</div>
                ) : (
                    <>
                        <div className={styles.flexWrappableText}>
                            Would you like to send a request to attend this
                            event?
                        </div>
                        <button
                            className={styles.smallTransparentButton}
                            onClick={makeRequest}
                        >
                            make a request
                        </button>
                    </>
                )}
            </>
        );
    };

    return (
        <div className={styles.rightContainer}>
            <div className={styles.horizontalContent}>
                <div className={styles.squishHeading}>EVENTS</div>
                <div className={styles.smallDivision}>
                    <div className={styles.verticalContent}>
                        <input
                            type="text"
                            placeholder="Search"
                            className={styles.inputMin}
                        ></input>
                        <Link to="/create-events">
                            <button className={styles.purpleButton}>
                                + Create
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.wrapContainer}>
                {events &&
                    events.map(event => (
                        <div key={event._id} style={{ margin: "10px" }}>
                            <Popup content={c => Content(event, c)}>
                                <EventItem event={event} />
                            </Popup>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Dashboard;
