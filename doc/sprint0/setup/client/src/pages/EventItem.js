import eventStyles from "../styles/event.module.css";
import styles from "../styles/common_styles.module.css";
import { useState } from "react";

import jwtDecode from "jwt-decode";

import Axios from "axios";

const EventItem = ({ event, disableRequest }) => {
    const token = jwtDecode(localStorage.getItem("token"));

    const [eventClicked, setEventClicked] = useState(false);
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
            {eventClicked === true && !disableRequest ? (
                <div className={styles.popupbg}>
                    <div className={styles.popup}>
                        <div
                            style={{
                                marginLeft: "auto",
                                marginRight: "0",
                                width: "min-content",
                            }}
                        >
                            <button
                                onClick={() => {
                                    setEventClicked(false);
                                    setProcessed(false);
                                }}
                                className={styles.smallTransparentButton}
                            >
                                x
                            </button>
                        </div>

                        {token.id === event.creator ? (
                            <div className={styles.text}>
                                this is your event
                            </div>
                        ) : processed ? (
                            <div className={styles.text}>
                                {processedMessage}
                            </div>
                        ) : (
                            <>
                                <div className={styles.flexWrappableText}>
                                    Would you like to send a request to attend
                                    this event?
                                </div>
                                <button
                                    className={styles.smallTransparentButton}
                                    onClick={makeRequest}
                                >
                                    make a request
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                ""
            )}
            <button
                className={eventStyles.eventDetails}
                onClick={() => setEventClicked(true)}
            >
                <div className={eventStyles.eventPhoto}>
                    <p>Photo</p>
                </div>
                <div className={styles.verticalContent}>
                    <h1 className={styles.boldtext}>{event.title}</h1>
                    <p className={styles.smalltext}>{event.date}</p>
                    <p className={styles.smalltext}>{event.location}</p>
                    <p className={styles.smalltext}>from ${event.price}</p>
                </div>
            </button>
        </>
    );
};

export default EventItem;
