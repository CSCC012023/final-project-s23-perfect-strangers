import { useEffect, useState } from "react";
import RequestItemByMe from "./RequestItemByMe";

import Axios from "axios";

import styles from "../styles/common_styles.module.css";

const RequestsByMe = ({email}) => {

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        Axios.post("http://localhost:5000/requests/search", {
            requester: email
        }).then(res => {
            setRequests(res.data)
        }).catch(err => console.log(err));
    }, []);

    return ( <div className={styles.wrapContainer}>{

        requests.map((req) => 
            <RequestItemByMe 
                key={req._id}
                _id={req._id}
                requestee={req.requestee}
                event_id={req.event_id}
                status={req.status}
                setRequests={setRequests}
            />
        )

    } </div> );
}
 
export default RequestsByMe;