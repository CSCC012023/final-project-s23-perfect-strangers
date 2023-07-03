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
          <div className={styles.container}>
            <h4>
              <b>John Doe</b>
            </h4>
            <p>Architect & Engineer</p>
          </div>
        </li>
        <li className={styles.requestSentCard}>
          <div className={styles.container}>
            <h4>
              <b>Deo John</b>
            </h4>
            <p>Architect & Engineer</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default RequestsSent;
