import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  Badge,
  ListGroup,
  Card,
  Container,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { useState, React, useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(null);
  const [student, setStudent] = useState("");
  const [ID, setID] = useState("");
  const location = useLocation();

  const username = location.state.username; // Access the userId prop
  const password = location.state.password;
  const url = "http://127.0.0.1:8000/UserDetails";

  // Now you can use the 'username' and 'password' values
  // console.log('Username:', username);
  // console.log('Password:', password);

 function handleSubmit(text) {
    navigate("/problem", {
      state: { username: username, password: password,qid:text},
    });
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

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://127.0.0.1:8000/Questions";
      const response = await fetch(url);
      const newdata = await response.json();
      setQuestions(newdata);
    };

    fetchData();
  }, []);

  const result = Array.isArray(questions);
  console.log("nice " + result);

  console.log(questions);

  if (result) {
    return (
      <>
        <h1>
          <Badge bg="secondary">Koder 💻 Kid</Badge>
        </h1>
        <h3>
          <Badge pill bg="warning">
            Crush it {student.username} !{" "}
          </Badge>
        </h3>
        <br></br>
        <Container>
          <Row xs={1} md={4}>
            {/* <h1>{questions[0].text}</h1> */}
            {questions.map((user) => (
              <div className="BIG">
                <div className="d-flex justify-content-center">
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Text>{user.text}</Card.Text>
                      <h3>
                        <Badge bg="danger">{user.points}</Badge>
                      </h3>
                      <Button
                        variant="success"
                        type="submit"
                        onClick={() => handleSubmit(user.id)}
                      >
                        Problem
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            ))}
          </Row>
        </Container>
      </>
    );
  } else {
    return (
      <h1>
        <Badge bg="secondary">Koder 💻 Kid</Badge>
      </h1>
    );
  }
};

export default Layout;
