import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import styles from "../styles/common_styles.module.css";


const InterestPopUp = ({interestList, useremail,
    userInterestList,  setUserInterestList,
    popupTrigger, setPopupTrigger,
  }) => {

  const toggleInterest = (interest) => {  // function to add/remove interests form userInterestList
    console.log(`toggling ${interest}`);
    if (userInterestList.includes(interest) === true) {
      setUserInterestList(prevList => prevList.filter(i => i !== interest));
    } else {
      setUserInterestList(prevList => [...prevList, interest]);
    }
  } 

  // function to handle closing of popup
  async function interestPopupCloseHandler() {
    setPopupTrigger(false);


    await Axios.delete("http://localhost:5000/api/userInterests/" + useremail).then(
      (response) => {
        console.log("User Interest document deleted!");
      }
    );

    await Axios.post("http://localhost:5000/api/userInterests/", {

      email: useremail,
      interestList: userInterestList,
    });
  }


  const globalInterestListUI = interestList.map(
    (interestItem, interestIndex) => {
      return (
        <div className={
          (userInterestList.includes(interestItem) === true)
          ? styles.smallPurpleButton 
          : styles.smallTransparentButton}
        onClick={()=> toggleInterest(interestItem)}
        key={interestIndex}>
          {interestItem}
        </div>
      );
    }
  );


  return popupTrigger ? (
    <div className={styles.popupbg}>
      <div className={styles.popup}>
        <div style={{marginRight:"10px", marginLeft: "auto", width:"fit-content"}}>
          <button
            className={`${styles.transparentButton}`}
            onClick={(event) => {
              interestPopupCloseHandler();
            }}
          >
            Save changes
          </button>
        </div>

        <br />


        <div className={styles.wrapContainer}>{globalInterestListUI}</div>
      </div>
    </div>
  ) : (
    ""
  );
};


const UserInterests = ({interestList, useremail}) => {

  // Get the user's interests from MongoDB
  // Limit to a maximum of 5 interests
  const [userInterestList, setUserInterestList] = useState([]);


  useEffect(() => {
    Axios.get("http://localhost:5000/api/userInterests/" + useremail)
      .then((response) => {
        // console.log("kikos");
        console.log(response);
        if (response.length === 0) {
          setUserInterestList([]);
        } else {
          setUserInterestList(response.data[0].interestList);
        }
      })
      .catch((error) => {
        setUserInterestList([]);
      });
  }, []);

  const [popupTrigger, setPopupTrigger] = useState(false);

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

      <button 
        className={styles.smallTransparentButton}
        onClick={() => setPopupTrigger(true)}
      >
      🖉
      </button>

      <InterestPopUp
        interestList={interestList} useremail={useremail}
        userInterestList={userInterestList} setUserInterestList={setUserInterestList}
        popupTrigger={popupTrigger} setPopupTrigger={setPopupTrigger}
      />
    </div>
  );
};

export default UserInterests;
