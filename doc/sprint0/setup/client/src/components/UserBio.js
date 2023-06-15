import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { Text } from "react-native"; // npm install react-native // npm install react-native-web

import "./UserBio.css";

import Form from "react-bootstrap/Form"; //npm install react-bootstrap

const UserBio = (props) => {
  const username = props.username;
  const url = "http://localhost:5000/api/";
  let [aboutText, setAboutText] = useState("");
  let [editedText, setEditedText] = useState(aboutText);
  let [editAbout, setEditAbout] = useState(false);

  function onEditSaveButtonClick() {
    if (editAbout) {
      setAboutText(editedText);

      Axios.post(url + "biography/", {
        username: username,
        biography: editedText,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));

      setEditAbout(false);
    } else {
      setEditAbout(true);
    }
  }

  useEffect(() => {
    Axios.get(url + "biography/" + username)
      .then((response) => {
        setAboutText(response.data.biography);
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const EditOrAbout = () => {
    if (editAbout) {
      return (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              <h4>Edit About</h4>
            </Form.Label>
            <Form.Control
              as="textarea"
              defaultValue={aboutText}
              type="text"
              onChange={(e) => setEditedText(e.target.value)}
              rows={10}
            />
          </Form.Group>
        </Form>
      );
    } else {
      return <Text style={{ color: "white", fontSize: 16 }}>{aboutText}</Text>;
    }
  };
  return (
    <>
      <div className="AboutMe">
        <h2>About Me</h2>
        <br />
        <div className="EditSaveButton" style={{ marginLeft: "auto" }}>
          {editAbout && (
            <Button
              variant="light"
              onClick={() => {
                setEditAbout(false);
                setEditedText(aboutText);
              }}
            >
              Cancel Edit
            </Button>
          )}
          <Button variant="light" onClick={onEditSaveButtonClick}>
            {!editAbout ? "Edit" : "Save"}
          </Button>
        </div>
      </div>
      <div className="EditOrAbout">{EditOrAbout()}</div>
    </>
  );
};

export default UserBio;
