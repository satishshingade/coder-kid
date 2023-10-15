import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Badge, ButtonGroup } from "react-bootstrap";

function App() {
  return (
    <>
      
      <div className="d-flex justify-content-center">
        <Form>
          <h3>
          <Badge bg="danger">Admin</Badge></h3>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3">
              Username
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" />
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
              <Form.Control type="password" placeholder="Password" />
              <br></br>
              <Button variant="secondary">Enter</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}

export default App;
