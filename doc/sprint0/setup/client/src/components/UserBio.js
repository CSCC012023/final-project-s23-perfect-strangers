import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { Text } from "react-native";

import Form from "react-bootstrap/Form";

function UserBio() {
  const username = "APIUsername";
  const url = "http://localhost:5000/users";
  let [aboutText, setAboutText] = useState("");
  let [editedText, setEditedText] = useState(aboutText);
  let [editAbout, setEditAbout] = useState(false);

  function onEditSaveButtonClick() {
    if (editAbout) {
      setAboutText(editedText);

      Axios.post(url + "/setBiography/", {
        username: username,
        biography: editedText,
      }).then((response) => {
        console.log(response);
      });

      setEditAbout(false);
    } else {
      setEditAbout(true);
    }
  }

  useEffect(() => {
    Axios.get(url + "/biography/", {
      params: { username: username },
    })
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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
      return <Text style={{ fontSize: 16 }}>{aboutText}</Text>;
    }
  };
  return (
    <>
      <div className="AboutMe" style={{ display: "flex" }}>
        <h2>About Me</h2>
        <div
          class="d-grid gap-2 d-md-flex justify-content-md-end"
          style={{ marginLeft: "auto" }}
        >
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
      {EditOrAbout()}
    </>
  );
}

export default UserBio;
