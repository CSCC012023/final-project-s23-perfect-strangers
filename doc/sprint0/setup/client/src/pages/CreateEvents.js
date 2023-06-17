import { useState, useEffect } from "react";
import Axios from 'axios';
import './CreateEvents.css';

import styles from "../styles/common_styles.module.css";
import ceStyles from "../styles/create_events.module.css";


function CreateEvents() {
    const [creator, setCreator] = useState("Jeremy");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [ticketLink, setTicketLink] = useState("");
    const [onMe, setOnMe] = useState(false);

    const createUserEvent = () => {
        Axios.post("http://localhost:5000/api/userevents", {
            creator, title, date, location, price, description, ticketLink, onMe
        }).then(() => {
            alert("Event Created!");
        });
    };


    return (

        <div className={ceStyles.createEventsPopup}>
            <div className={styles.horizontalContent}>
                <div className={styles.squishHeading}>Create Your Event</div>
            </div>
            <div>
                <div className={styles.horizontalContent}>
                    <div className={styles.verticalContent}>
                        <div className={styles.division}>
                            <p className={styles.text}>Give the event a name</p><br />
                        </div>
                        <div className={styles.division}>
                            <input type='text' className={styles.inputField} placeholder='name' onChange={(event) => setTitle(event.target.value)}></input>
                        </div>
                    </div>
                    <div className={styles.verticalContent}>
                        <div className={styles.division}>
                            <p className={styles.text}>When is your event?</p><br/>
                        </div>
                        <div className={styles.division}>
                            <input type='date' className={styles.inputField} placeholder='date' onChange={(event) => setDate(event.target.value)}></input> 
                        </div>
                    </div>
                </div>
                <div className={styles.horizontalContent}>
                    <div className={styles.verticalContent}>
                        <div className={styles.division}>
                            <p className={styles.text}>Where will it be?</p><br/>
                        </div>
                        <div className={styles.division}>
                            <input type='text' className={styles.inputField} placeholder='location' onChange={(event) => setLocation(event.target.value)}></input>
                        </div>
                    </div>
                    <div className={styles.verticalContent}>
                        <div className={styles.division}>
                            <p className={styles.text}>How much is a ticket?</p><br/>
                        </div>
                        <div className={styles.division}>
                            <input type='number' className={styles.inputField} placeholder='price' onChange={(event) => setPrice(event.target.value)}></input>
                        </div>
                    </div>
                </div>
                <div className={styles.horizontalContent}>
                    <div className={styles.verticalContent}>
                        <div className={styles.division}>
                            <p className={styles.text}>Are tickets OnMe?</p><br/>
                        </div>
                        <div className={styles.division}>
                            <input type="radio" name="OnMe" value ="true" className="OnMeRadio" onClick={() => setOnMe(true)}></input><p className={styles.text}>Yes</p>
                            <input type="radio" name="OnMe" value="false" className="OnMeRadio" onClick={() => setOnMe(false)}></input><p className={styles.text}>No</p> 
                        </div>
                        {/* <input type='checkbox' className="EventBox" onChange={() => setOnMe(!onMe)}></input> */}
                    </div>
                    <div className={styles.verticalContent}>
                        <div className={styles.division}>
                            <p className={styles.text}>Where can you buy tickets?</p><br/>
                        </div>
                        <div className={styles.division}>
                            <input type='text' className={styles.inputField} placeholder='link' onChange={(event) => setTicketLink(event.target.value)}></input>
                        </div>
                    </div>
                </div>
                <div className={styles.division}>
                    <div className={styles.verticalContent}>
                        <p className={styles.text}>Describe the event for others</p><br/>
                        <textarea className={styles.inputField} style={{width: '500px'}}placeholder="type of event, genre of music..." onChange={(event) => setDescription(event.target.value)}></textarea>
                    </div>
                </div>
                <div className={styles.division}>
                    <button className={styles.purpleButton} onClick={createUserEvent}>Create Event</button>
                </div>

            </div>
        </div>
    );
}

export default CreateEvents;