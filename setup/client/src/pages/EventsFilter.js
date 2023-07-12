import React from "react";

import styles from "../styles/common_styles.module.css";

import { FaFilter } from "@react-icons/all-files/fa/FaFilter"; // npm install @react-icons/all-files --save
import { EventTagsPopup } from "./EventsTags";

const EventsFilter = ({
  selectedTags, setSelectedTags, 
  popupTrigger, setPopupTrigger, getEventsList}) => {

  const selectedFiltersUI = selectedTags.map((currfilter, filterIndex) => {
    return (
      <div className={styles.smallPurpleButton} key={filterIndex}>
        {currfilter}
      </div>
    );
  });

  return(
    <> 
      <div className={styles.smallPurpleButton} onClick={() => setPopupTrigger(true)}> 
        <FaFilter/> 
      </div>
    
      {selectedFiltersUI} 

      <EventTagsPopup 
        popupTrigger={popupTrigger} setPopupTrigger={getEventsList} // Slightly hacky
        selectedTags={selectedTags} setSelectedTags={setSelectedTags}
      />
    </>
  )
}

export default EventsFilter;