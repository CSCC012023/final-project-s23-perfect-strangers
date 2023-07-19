import eventStyles from "../styles/event.module.css";
import styles from "../styles/common_styles.module.css";
const EventItem = ({ event }) => {
  
  var userEventID = event._id;

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  // Storing event image in local storage where 'key' includes user event id
  localStorage.setItem(
    "eventPic" + userEventID,
    _arrayBufferToBase64(event.image.data.data)
  );

  return (
    <>
      <div
        className={eventStyles.eventDetails}
      >
        // For CGP-12
        <div className={eventStyles.eventPhotoContainer}>
        <img
            src={`data:image/png;base64,${localStorage.getItem("eventPic" + userEventID)}`}
            alt="No photo"
            className={eventStyles.eventPhoto}
        />
        </div>
        <div className={styles.verticalContent}>
          <h1 className={styles.boldtext}>{event.title}</h1>
          <p className={styles.smalltext}>{event.date}</p>
          <p className={styles.smalltext}>{event.location}</p>
          <p className={styles.smalltext}>from ${event.price}</p>
        </div>
      </div>
    </>
  );
};

export default EventItem;
