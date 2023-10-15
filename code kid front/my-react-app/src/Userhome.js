import React, { useEffect } from "react";
import { useLocation ,Link ,useNavigate} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

import {
  Button,
  Table,
  Badge,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

function NewPage() {
  const [student, setStudent] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state.username; // Access the userId prop
  const password = location.state.password;
  const url = "http://127.0.0.1:8000/UserDetails";

  // Now you can use the 'username' and 'password' values
  // console.log('Username:', username);
  // console.log('Password:', password);

  const handleSubmit = (event) => {
    
      navigate("/userquestion",{ state: { username: username, password:password} });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(url, {
          username: username,
          password: password,
        });

        setStudent(response.data);
        console.log("Response:", response.data); // Handle the response as needed
        alert(response.data.username + " " + response.data.password);
      } catch (error) {
        console.error("Error:", error);
        alert("something went wrong", error);
      }
    };
    fetchData();
  }, []);

  const img1 =
    "https://img.freepik.com/free-vector/connect-jigsaw-pieces-into-shape-light-bulb_1150-35036.jpg?size=626&ext=jpg&ga=GA1.2.35708074.1690722428&semt=sph";
  const img2 =
    "https://img.freepik.com/free-vector/grades-concept-illustration_114360-5958.jpg?size=626&ext=jpg&ga=GA1.2.35708074.1690722428&semt=sph";
  const img3 =
    "https://img.freepik.com/free-vector/learning-concept-illustration_114360-6186.jpg?size=626&ext=jpg&ga=GA1.2.35708074.1690722428&semt=sph";
  return (
    <>
      <h1>
        <Badge bg="secondary">Koder 💻 Kid</Badge>
      </h1>
      <h3>
        <Badge pill bg="warning">
          Hello {student.username} !{" "}
        </Badge>
      </h3>
      <br></br>
      <br></br>
      <div className="d-flex justify-content-center">
        <ListGroup horizontal>
          <Card style={{ width: "12rem" }}>
            <Card.Img variant="top" src={img1} height={200} />
            
            <Card.Body>
              <Card.Title>
                {student.username} <br></br>Let's Solve Problems
              </Card.Title>

              
              <Button variant="danger" type="submit" onClick={handleSubmit} >Problem</Button>
            </Card.Body>
            
          </Card>

          <Card style={{ width: "12rem" }}>
            <Card.Img variant="top" src={img2} height={200} />
            <Card.Body>
              <div className="d-flex justify-content-center">
                <Badge bg="success">
                  <Card.Title>{student.points}</Card.Title>
                  Points
                  
                </Badge>
              </div>
            </Card.Body>
          </Card>

          <Card style={{ width: "12rem" }}>
            <Card.Img variant="top" src={img3} height={200} />
            <Card.Body>
              <Card.Title>Let's Learn</Card.Title>

              <Button variant="primary">Learn</Button>
            </Card.Body>
          </Card>
        </ListGroup>
      </div>
    </>
  );
}

export default NewPage;
