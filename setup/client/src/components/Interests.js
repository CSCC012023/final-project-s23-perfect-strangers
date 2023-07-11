import React from "react";

import { useState } from "react";
import { useEffect } from "react";

import Axios from "axios";

import styles from "../styles/common_styles.module.css";

import Popup from "../CommonItems/Popup";

const InterestPopUp = ({
  interestList,
  userInterestList,
  setUserInterestList,
  useremail,
  children,
}) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [popupTrigger, setPopupTrigger] = useState(false);

  useEffect(() => {
    setSelectedInterests(userInterestList);
  }, [userInterestList]);

  const toggleInterest = interest => {
    // function to add/remove interests form userInterestList
    console.log(`toggling ${interest}`);
    if (selectedInterests.includes(interest) === true) {
      setSelectedInterests(prevList => prevList.filter(i => i !== interest));
    } else {
      setSelectedInterests(prevList => [...prevList, interest]);
    }
  };

  async function interestPopupCloseHandler() {
    // function to handle closing of popup
    setPopupTrigger(false);

    setUserInterestList(selectedInterests);

    await Axios.delete(
      "http://localhost:5000/api/userInterests/" + useremail
    ).then(response => {
      console.log({ msg: "User Interest document deleted!", response });
    });

    await Axios.post("http://localhost:5000/api/userInterests/", {
      email: useremail,
      interestList: selectedInterests,
    });
  }

  const globalInterestListUI = interestList.map(
    (interestItem, interestIndex) => (
      <div
        className={
          selectedInterests.includes(interestItem) === true
            ? styles.smallPurpleButton
            : styles.smallTransparentButton
        }
        onClick={() => toggleInterest(interestItem)}
        key={interestIndex}
      >
        {interestItem}
      </div>
    )
  );

  return (
    <>
      {popupTrigger ? (
        <div className={styles.popupbg}>
          <div className={styles.popup}>
            <div
              style={{
                marginLeft: "auto",
                marginRight: "0",
                width: "min-content",
              }}
            >
              <button
                onClick={() => setPopupTrigger(false)}
                className={styles.smallTransparentButton}
              >
                x
              </button>
            </div>

            <div className={styles.wrapContainer}>{globalInterestListUI}</div>
            <div
              style={{
                marginRight: "10px",
                marginLeft: "auto",
                width: "fit-content",
              }}
            >
              <button
                className={`${styles.transparentButton}`}
                onClick={event => {
                  interestPopupCloseHandler();
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div onClick={() => setPopupTrigger(true)}>
        {children}
      </div>
    </>
  );
};

const UserInterests = ({ interestList, useremail }) => {
  // Get the user's interests from MongoDB
  // Limit to a maximum of 5 interests
  const [userInterestList, setUserInterestList] = useState([]);

  useEffect(() => {
    console.log({ useremail, interestList });
    Axios.get("http://localhost:5000/api/userInterests/" + useremail)
      .then(response => {
        // console.log("kikos");
        console.log(response);
        if (response.length === 0) {
          setUserInterestList([]);
        } else {
          setUserInterestList(response.data[0].interestList);
        }
      })
      .catch(error => {
        setUserInterestList([]);
      });
  }, []);

  const userinterestListUI = userInterestList.map(
    (interestItem, interestIndex) => {
      return (
        <div className={styles.smallPurpleButton} key={interestIndex}>
          {interestItem}
        </div>
      );
    }
  );

  return (
    <div className={styles.horizontalContent}>
      {userinterestListUI}

      <InterestPopUp
        interestList={interestList}
        userInterestList={userInterestList}
        setUserInterestList={setUserInterestList}
        useremail={useremail}>
        <div className={styles.smallTransparentButton}>🖉</div>
      </InterestPopUp>
        
    </div>
  );
};

export default UserInterests;
