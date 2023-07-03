import requestStyles from "../styles/requests.module.css";
import styles from "../styles/common_styles.module.css";
import eventStyles from "../styles/event.module.css";
import axios from "axios";


const RequestItemByMe = ({_id, requestee, event_id, status, setRequests}) => {

    //TODO: DELETE REQUEST to delete the request
    const deleteRequest = () => {
        axios.delete("http://localhost:5000/requests/delete/" + _id)
        .then(res => {
            setRequests(prev => prev.filter(r => r._id !== _id));
        })
        .catch(err => console.log(err));
    }

    return ( <div className={requestStyles.request}>
        <div className={styles.text}>{requestee}</div>
        <div className={styles.line} />
        <div className={eventStyles.eventDetails}>
            <div className={styles.text}>{event_id}</div>
        </div>
        <div className={styles.horizontalContent}>
            <div style={{marginTop: "10px", marginLeft: "5px", marginRight: "auto"}}>
                <div className={styles.smalltext}>
                    <div style={{fontWeight: 700}}>{status}</div>
                </div> 
            </div>
            <button 
                className={styles.smallPurpleButton}
                onClick={deleteRequest}
            >Cancel Request
            </button>
        </div>
    </div> );
}
 
export default RequestItemByMe;