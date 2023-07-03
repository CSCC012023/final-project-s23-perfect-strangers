import eventStyles from '../styles/event.module.css';
import styles from '../styles/common_styles.module.css';

const EventItem = ({event}) => {
    return ( <div className={eventStyles.eventDetails}>
        <div className={eventStyles.eventPhoto}>
          <p>Photo</p>
        </div>
        <div className={styles.verticalContent}>
          <h1 className={styles.boldtext}>{event.title}</h1>
          <p className={styles.smalltext}>{event.date}</p>
          <p className={styles.smalltext}>{event.location}</p>
          <p className={styles.smalltext}>from ${event.price}</p>

        </div>
      </div> );
}
 
export default EventItem;