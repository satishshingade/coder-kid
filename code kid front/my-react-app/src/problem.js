import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";

import {
  Button,
  Table,
  Badge,
  Card,
  ListGroup,
  ListGroupItem,
  ProgressBar,
  Form,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import "./card.css"; // Import your CSS file for styling

function renderSwitch(param, student, username, password, points) {
  switch (param) {
    case -1:
      return (
        <div>
          <h2>
            <Badge bg="secondary">Loading </Badge>
          </h2>
          <Spinner animation="border" variant="primary" />
          <Spinner animation="border" variant="secondary" />
          <Spinner animation="border" variant="success" />
          <Spinner animation="border" variant="danger" />
          <Spinner animation="border" variant="warning" />
          <Spinner animation="border" variant="info" />
          <Spinner animation="border" variant="light" />
          <Spinner animation="border" variant="dark" />
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
          <Spinner animation="grow" variant="light" />
          <Spinner animation="grow" variant="dark" />
        </div>
      );
    case 0:
      return (
        <h2>
          <Badge bg="danger">Oopsss!! you got wrong answer</Badge>
        </h2>
      );
    case 1:
      const url7 = "http://127.0.0.1:8000/updatepoint";
      
        const fetchData = async () => {
            try {
            const response = await axios.post(url7, {
                username: username,
                password: password,
                points: points,
            });
              console.log(response.data)
            } catch (error) {
            alert("something went wrong", error);
            }
        };
        fetchData();
     
      return (
        <div>
          <h2>
            <Badge bg="success">Correct Answer !!</Badge>
          </h2>
          {/* <h3>
            <Badge bg="warning">"points Updated "{student.points}</Badge>
          </h3> */}
        </div>
      );
  }
}

const TextAreaWithLineNumbers = () => {
  const [student, setStudent] = useState("");
  const [currquestion, setCurrQuestion] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state.username; // Access the userId prop
  const password = location.state.password;
  const qid = location.state.qid;
  console.log(username, password);

  // Now you can use the 'username' and 'password' values
  // console.log('Username:', username);
  // console.log('Password:', password);
  const url = "http://127.0.0.1:8000/getquestion?text=" + qid;
  const url2 = "http://127.0.0.1:8000/UserDetails";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(url, {});

        setCurrQuestion(response.data);
      } catch (error) {
        alert("something went wrong", error);
      }
    };

    const fetchData2 = async () => {
      try {
        const response = await axios.post(url2, {
          username: username,
          password: password,
        });

        setStudent(response.data);
      } catch (error) {
        alert("something went wrong", error);
      }
    };

    fetchData2();
    fetchData();
  }, []);

  ///////////////////////////////////////////////////////

  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [Correct, setCorrect] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    // Handle the submission of the text
    const url3 = "http://127.0.0.1:8000/compile";
    const url4 = "http://127.0.0.1:8000/runtest";

    console.log("Submitted:", text, text.length);
    const temp = [];
    var s = "";

    for (let i = 0; i < text.length; i++) {
      if (text[i] === "\n") {
        temp.push(s);
        s = "";
      } else if (text[i] === '"') {
        s += '"';
      } else s += text[i];
    }

    temp.push(s);
    var Ret1 = "";
    var Ret = "";
    const fetchData3 = async () => {
      try {
        const response = await axios.post(url3, {
          code: temp,
        });
        console.log("here in 3");

        console.log(response.data.bad);
        if (response.data.bad) {
          setResult(response.data.bad);
          Ret1 += response.data.bad;
        }
      } catch (error) {
        alert("something went wrong", error);
      }
    };

    const temp2 = ["x"];
    var AnsT = "";

    const fetchData4 = async () => {
      try {
        console.log(temp2);
        const response = await axios.post(url4, {
          code: temp2,
        });

        Ret +=
          "Input: " + String(temp2) + "    Your Output: " + String(response.data);
        Ret += String("\n");
        AnsT = response.data;
        setResult(Ret);
      } catch (error) {
        alert("something went wrong while running", error);
      }
    };

    // console.log(currquestion.test_cases.length)

    // fetchData3();
    // console.log("result " + result);

    // for (let i = 0; i < currquestion.test_cases.length; i++) {
    //   temp2.pop();
    //   temp2.push(currquestion.test_cases[i]);
    //   fetchData4();
    // }

    setCorrect(-1);
    const fetchData5 = async () => {
      await fetchData3();
      if (Ret1.length != 0) {
        setResult(Ret1);
      } else {
        for (let i = 0; i < currquestion.test_cases.length; i++) {
          temp2.pop();
          temp2.push(currquestion.test_cases[i]);
          await fetchData4();
          //   console.log(AnsT+" "+currquestion.answers[i]);
          if (AnsT != currquestion.answers[i]) {
            setCorrect(0);
          } else {
            setCorrect(1);
          }
        }
      }
    };

    fetchData5();
  };

  //   console.log(currquestion.)
  const handleReset = () => {
    setText("");
  };

  const textLines = text.split("\n").map((line, index) => (
    <div key={index} className="line-number">
      {index + 1}
    </div>
  ));

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
      <div className="d-flex justify-content-center">
        <h4>
          <Badge bg="secondary"> Quesiton ID: {currquestion.id}</Badge>
        </h4>
      </div>
      <div className="d-flex justify-content-center">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={currquestion.image_link} />
          <Card.Body>
            <Card.Title>
              <Badge bg="warning"> Points {currquestion.points} </Badge>
            </Card.Title>

            <Card.Text>{currquestion.text}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <br></br>
      <div className="text-area-container">
        <div className="line-numbers">{textLines}</div>
        <textarea
          className="text-area"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter Code here..."
        />
      </div>
      <div className="Lav">
        <div className="button-container">
          <Button
            varient="success"
            className="submit-button"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            varient="danger"
            className="reset-button"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>

      <div>
        <h2>
          <Badge bg="secondary">Result:</Badge>
        </h2>
        <h4>
          <div className="result-container">
            <pre>{result}</pre>
          </div>
        </h4>
      </div>
      <h2>
        {renderSwitch(
          Correct,
          student,
          username,
          password,
          currquestion.points
        )}
      </h2>
    </>
  );
};

export default TextAreaWithLineNumbers;
