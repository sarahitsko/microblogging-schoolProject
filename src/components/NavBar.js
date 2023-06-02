import { Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  return (
    <>
      <Navbar variant="dark" id="nav-bar" className="d-flex w-75 ">
        <Container>
          <Nav className="me-auto">
            <Nav className="me-auto">
              <Link to="/">Home</Link>
              <Link to="/profile">Profile</Link>
            </Nav>
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default NavBar;
