import { useState } from "react";

import styles from "../styles/common_styles.module.css";
import eventStyles from "../styles/event.module.css";

const EventPopupContent = ({userid, event, close}) => {
    const [editing, setEditing] = useState(false);

    const staticContent = (<div className={styles.verticalContent}>
            <img
            src={`http://localhost:5000/uploads/` + event.image}
            alt="No photo"
            className={eventStyles.expandedPhoto}
        />
        </div>)

    return (<div>
        {staticContent}
        {/* {userid === event.creator ? <div>
        
        </div> : <div>
            
        </div>} */}
    </div>);
}
 
export default EventPopupContent;