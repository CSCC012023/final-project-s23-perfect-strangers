import React from "react";
import Axios from "axios";

import { useState, useReducer} from "react";
import { useEffect } from "react";

import jwt_decode from "jwt-decode";

import styles from "../styles/common_styles.module.css";
import bioPageStyles from "../styles/bio_page.module.css";

const ProfilePicture = () => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [profilePic, setProfilePic] = useState("");
  
    const [profileClicked, setProfileClicked] = useState(false);

    // Retrieve token for current user session
    const token = localStorage.getItem("token");
    var useremail = jwt_decode(token).userDetail.email;
    
    // POST profile picture to MongoDB when user uploads an image
    const changeProfilePic = (e) => {
      e.preventDefault();
      forceUpdate();
  
      if (profilePic !== "") {
        console.log(profilePic);
  
        const formData = new FormData();
        formData.append("email", useremail);
        formData.append("profilePic", profilePic);
  
        Axios.post("http://localhost:5000/user-details/image/", formData)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => console.log(err));
        console.log("Image uploaded");
        setProfileClicked(false);
      }
    };
    
    // Coverts image from binary to base64
    function _arrayBufferToBase64(buffer) {
      var binary = "";
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    }
  
    // Sets profile picture to existing picture in mongoDB
    useEffect(() => {
      Axios.get("http://localhost:5000/user-details/image/" + useremail)
        .then((response) => {
          localStorage.setItem(
            "userPic",
            _arrayBufferToBase64(response.data.image.data.data)
          );
          //console.log(response);
        })
        .catch((err) => console.log(err));
    }, []);
  
    return (
      <>
        {profileClicked === true ? (
          <div className={styles.popupbg}>
            <div className={styles.popup}>
              <div style={{ marginLeft: "auto", marginRight: "0", width: "min-content", }} >
                <button
                    onClick={() => { setProfileClicked(false); }}
                    className={styles.smallTransparentButton}
                >
                    x
                </button>
              </div>
  
              <>
                <div className={styles.flexWrappableText}>
                  Change profile picture?
                </div>
  
                <form onSubmit={changeProfilePic} encType="multipart/form-data">
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="profilePic"
                    onChange={(e) => {
                      setProfilePic(e.target.files[0]);
                      forceUpdate();
                    }}
                    style={{ color: "white" }}
                  />
  
                  <input
                    className="upload-btn"
                    type="submit"
                    value="Upload Photo"
                  />
                </form>
              </>
            </div>
          </div>
        ) : (
          ""
        )}
        <button
          className={bioPageStyles.ProfilePictureButton}
          onClick={() => setProfileClicked(true)}
        >
          <img
            className={bioPageStyles.ProfilePicture}
            src={`data:image/png;base64,${localStorage.getItem("userPic")}`}
            alt=""
          />
        </button>
      </>
    );
};

export default ProfilePicture;