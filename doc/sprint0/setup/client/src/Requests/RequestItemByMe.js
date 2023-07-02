import requestStyles from "../styles/requests.module.css";
import styles from "../styles/common_styles.module.css";
import eventStyles from "../styles/event.module.css";

const RequestItemByMe = ({requestee, event_id, status}) => {
    return ( <div className={requestStyles.request}>
        <div className={styles.smalltext}>{requestee}</div>\
        <div className={eventStyles.eventDetails}>Events</div>
    </div> );
}
 
export default RequestItemByMe;