import React from "react";

import { useState } from "react";
import { useEffect } from "react";
//import { useReducer } from "react";

//import { IconContext } from "react-icons"; // npm install react-icons --save
//import { CiEdit } from "react-icons/ci";
import Axios from "axios";
//import "./Interests.css";
//import "reactjs-popup/dist/index.css"; // npm i reactjs-popup

import styles from "../styles/common_styles.module.css";

/* const InterestPopUp = (props) => { 
  not good practice, always destructure your props so we know what inputs it needs
*/
const InterestPopUp = 
  ( {interestList,
    userInterestList, 
    setUserInterestList,
    popupTrigger,
    setPopupTrigger,
  }) => {

  //const [, forceUpdate] = useReducer((x) => x + 1, 0);    // why?
  
  /* const [selectedInterests, setSelectedInterests] = useState( userInterestList ); 
    unnecessary, we already get the state and setter of userInterestList
  */

  /* function changeInterestColorToPurple(colorList, index) {
    if (colorList[index] !== "#B14EFF") {
      var tempList = colorList;
      tempList[index] = "#B14EFE";
      props.setInterestColorList(tempList);
      forceUpdate();
    }
  }

  function changeInterestColorToWhite(colorList, index) {
    if (colorList[index] !== "#B14EFF") {
      var tempList = colorList;
      tempList[index] = "white";
      props.setInterestColorList(tempList);
      forceUpdate();
    }
  }

  function popUpInterestItemClickHandler(currentItem, index, colorList) {
    const isPresent = selectedInterests.indexOf(currentItem) > -1;
    var tempList = colorList;

    if (!isPresent && selectedInterests.length < 5) {
      tempList[index] = "#B14EFF";
      props.setInterestColorList(tempList);

      setSelectedInterests([...selectedInterests, currentItem]);
      forceUpdate();
    } else {
      tempList[index] = "white";
      props.setInterestColorList(tempList);

      setSelectedInterests(
        selectedInterests.filter((interest) => interest !== currentItem)
      );
      forceUpdate();
    }
  }
    these functions only exist to change colors, which can be acheived easily with conditional css
  */

  const toggleInterest = (interest) => {  // function to add/remove interests form userInterestList
    console.log(`toggling ${interest}`);
    if (userInterestList.includes(interest) === true) {
      setUserInterestList(prevList => prevList.filter(i => i !== interest));
    } else {
      setUserInterestList(prevList => [...prevList, interest]);
    }
  } 

  async function interestPopupCloseHandler() {  // function to handle closing of popup
    setPopupTrigger(false);

    await Axios.delete("http://localhost:5000/api/userInterests/faisalf4").then(
      (response) => {
        console.log("User Interest document deleted!");
      }
    );

    await Axios.post("http://localhost:5000/api/userInterests/", {
      username: "faisalf4",
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

        {/* <div
          className="GlobalIndvInterest"
          style={{ backgroundColor: props.interestColorList[interestIndex] }}
          onMouseEnter={(event) => {
            changeInterestColorToPurple(props.interestColorList, interestIndex);
          }}
          onMouseLeave={(event) => {
            changeInterestColorToWhite(props.interestColorList, interestIndex);
          }}
          onClick={(event) => {
            popUpInterestItemClickHandler(
              interestItem,
              interestIndex,
              props.interestColorList
            );
          }}
        >
        obsolete*/}
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

const UserInterests = ({interestList}) => {
  // Get the user's interests from MongoDB
  // Limit to a maximum of 5 interests
  const [userInterestList, setUserInterestList] = useState([]);
  /* const [interestColorList, setInterestColorList] = useState(
    props.interestList.map((interest, interestIndex) => {
      const isPresent = userInterestList.indexOf(interest) > -1;
      if (!isPresent) {
        return "white";
      } else {
        return "#B14EFF";
      }
    })
  ); 
  obsolete
  */

  useEffect(() => {
    Axios.get("http://localhost:5000/api/userInterests/faisalf4")
      .then((response) => {
        // console.log("kikos");
        console.log(response);
        if (response.length === 0) {
          setUserInterestList([]);
        } else {
          setUserInterestList(response.data[0].interestList);
          /* setInterestColorList(
            props.interestList.map((interest, interestIndex) => {
              const isPresent = userInterestList.indexOf(interest) > -1;
              if (!isPresent) {
                return "white";
              } else {
                return "#B14EFF";
              }
            })
          );
          obsolete
          */
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

      {/* <button className="InterestEditBtn" onClick={() => setPopupTrigger(true)}>
        <IconContext.Provider value={{ color: "white", size: 25 }}>
          <CiEdit />
        </IconContext.Provider>
      </button>
      obsolete */}

      <button 
        className={styles.smallTransparentButton}
        onClick={() => setPopupTrigger(true)}
      >
      🖉
      </button>

      <InterestPopUp
        interestList={interestList}
        userInterestList={userInterestList}
        setUserInterestList={setUserInterestList}
        popupTrigger={popupTrigger}
        setPopupTrigger={setPopupTrigger}
      />
    </div>
  );
};

export default UserInterests;
