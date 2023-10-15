import { Outlet, Link } from "react-router-dom";
import { Button, Table, Badge,ListGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

function Layout() {
  return (
    <>
      <h1>
        <Badge bg="secondary">Koder 💻 Kid</Badge>
      </h1>
      <div className="d-flex justify-content-center">
      <ListGroup horizontal>
        <Card style={{ width: "12rem" }}>
          <Card.Img
            variant="top"
            src="https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=740"
          />
          <Card.Body>
            <Card.Title>Hey I am Ready</Card.Title>
            {/* <Card.Text>Hey I am Ready</Card.Text> */}
            <Link to="/user">
              <Button variant="primary">User</Button>
            </Link>
          </Card.Body>
        </Card>
        
        <Card style={{ width: "12rem" }}>
          <Card.Img
            variant="top"
            src="https://img.freepik.com/premium-vector/businessman-flat-icon_263753-2565.jpg?w=740"
          />
          <Card.Body>
            <Card.Title>Let's See</Card.Title>
            {/* <Card.Text>Hmm Let's see</Card.Text> */}
            <Link to="/admin">
              <Button variant="primary">Admin</Button>
            </Link>
          </Card.Body>
        </Card>
      </ListGroup>

      
      
      </div>
      <br></br>
      <Outlet />
    </>
  );
}

export default Layout;
