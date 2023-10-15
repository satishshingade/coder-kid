import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Badge, ButtonGroup } from "react-bootstrap";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";



import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  Routes,
  Outlet,
} from "react-router-dom";

import Userhome from "./Userhome";
import { useNavigate } from "react-router-dom"; // Import useHistory

function App() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = "http://127.0.0.1:8000/UserEnter";

    // Now you can use the 'username' and 'password' values
    // console.log('Username:', username);
    // console.log('Password:', password);

    try {
      const response = axios.post(url, {
        username: username,
        password: password,
      });

      console.log("Response:", response.data); // Handle the response as needed
      alert("done");
      navigate("/userhome",{ state: { username: username, password:password} });
    } catch (error) {
      console.error("Error:", error);
      alert("something went wrong", error);
    }
  };

 

  return (
    <>
      <div className="d-flex justify-content-center">
        <Form>
          <h3>
            <Badge bg="warning">User</Badge>
          </h3>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3">
              Username
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="3">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <br></br>
              <Button variant="secondary" type="submit" onClick={handleSubmit}>
                Enter
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}

export default App;
