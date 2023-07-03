import styles from "../styles/common_styles.module.css";
function RequestsSent() {
  const requestSent = [];
  return (
    <div className={styles.rightContainer}>
      <div className={styles.horizontalContent}>
        <div className={styles.squishHeading}>Requests Sent</div>
      </div>
      <ul className={styles.unorderedList}>
        <li className={styles.requestSentCard}>
          <div className={styles.requestSentCardContent}>
            <h4>
              <b>Event Name</b>
            </h4>
            <p>Event Date</p>
            <p>Location</p>
            <p>When</p>
          </div>
          <div className={styles.requestCardStatus}>Request Status</div>
        </li>
        <li className={styles.requestSentCard}>
          <div className={styles.requestSentCardContent}>
            <h4>
              <b>Event Name</b>
            </h4>
            <p>Event Date</p>
            <p>Location</p>
            <p>When</p>
          </div>
          <div className={styles.requestCardStatus}>Request Status</div>
        </li>
        <li className={styles.requestSentCard}>
          <div className={styles.requestSentCardContent}>
            <h4>
              <b>Event Name</b>
            </h4>
            <p>Event Date</p>
            <p>Location</p>
            <p>When</p>
          </div>
          <div className={styles.requestCardStatus}>Request Status</div>
        </li>
        <li className={styles.requestSentCard}>
          <div className={styles.requestSentCardContent}>
            <h4>
              <b>Event Name</b>
            </h4>
            <p>Event Date</p>
            <p>Location</p>
            <p>When</p>
          </div>
          <div className={styles.requestCardStatus}>Request Status</div>
        </li>
        <li className={styles.requestSentCard}>
          <div className={styles.requestSentCardContent}>
            <h4>
              <b>Event Name</b>
            </h4>
            <p>Event Date</p>
            <p>Location</p>
            <p>When</p>
          </div>
          <div className={styles.requestCardStatus}>Request Status</div>
        </li>
        <li className={styles.requestSentCard}>
          <div className={styles.requestSentCardContent}>
            <h4>
              <b>Event Name</b>
            </h4>
            <p>Event Date</p>
            <p>Location</p>
            <p>When</p>
          </div>
          <div className={styles.requestCardStatus}>Request Status</div>
        </li>
      </ul>
    </div>
  );
}

export default RequestsSent;
