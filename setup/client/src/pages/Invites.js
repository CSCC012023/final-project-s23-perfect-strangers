import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import PromoterRequestForMe from "../Requests/PromoterRequestForMe";

import Axios from "axios";

import styles from "../styles/common_styles.module.css";
import RequestItemForMe from "../Requests/RequestItemForMe";

function Invites(){
    const token = jwtDecode(localStorage.getItem("token"));
    console.log(token);

    const [myEvents, setMyEvents] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [acceptedRequests, setAcceptedRequests] = useState([]);
    const [requestToggle, setRequestToggle] = useState(false);

    // useEffect(() => {
    //   Axios.get("http://localhost:5000/requests/for/" + token.id)
    //     .then((res) => {
    //       console.log(res.data);
    //       setForMeRequests(res.data);
    //     })
    //     .catch((err) => console.log(err));
    // }, []);

    useEffect(() => {
        Axios.get("http://localhost:5000/promoter-requests/pending/for/" + token.id)
        .then((res) => {
            setPendingRequests(res.data);
            console.log("this is the result of the pending request");
            console.log(res.data);
        })
        .catch((err) => console.log(err));
        Axios.get("http://localhost:5000/promoter-requests/accepted/for/" + token.id)
        .then((res) => {
            setAcceptedRequests(res.data);
            console.log("this is the result of the accepted request");
            console.log(res.data);
        })
        .catch((err) => console.log(err));
    }, []);
    
    return (
        <div className={styles.rightContainer}>
            <div className={styles.squishHeading}>PROMOTER REQUESTS</div>
            <div className={styles.wrapContainer}>
            <div className={styles.horizontalContent}>    
                <div style={{ flex: "1" }}>
                    <button
                        className={styles.smallTransparentButton}
                        onClick={() => setRequestToggle(false)}
                        disabled={!requestToggle}
                    >
                        Incoming Requests
                    </button>
                </div>

                <div style={{ flex: "1" }}>
                    <button
                        className={styles.smallTransparentButton}
                        onClick={() => setRequestToggle(true)}
                        disabled={requestToggle}
                    >
                        Events I'm Promoting
                    </button>
                </div>
            </div>
            </div>
            {requestToggle ? (
                <div className={styles.wrapContainer}>
                {acceptedRequests.map((request) => (
                    <PromoterRequestForMe
                    event={request}
                    />
                ))}{" "}
                </div>
            ): (
                <div className={styles.wrapContainer}>
                {pendingRequests.map((request) => (
                    <PromoterRequestForMe
                    event={request}
                    />
                ))}{" "}
                </div>
            )}
        </div>
    );
}

export default Invites;