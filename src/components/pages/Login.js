import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AppContext from "../libs/AppContext";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useContext(AppContext);

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        setCurrentUser(userCredential.user.uid);
        localStorage.setItem(
          "currentUser",
          JSON.stringify(userCredential.user.uid)
        );
      }
    } catch (err) {
      console.log(err);
    }
    navigate("/Home");
  };

  return (
    <Form className="d-flex w-30 signUpContainer ">
      <Form.Group className="mb-3 w-75 " controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 w-75" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
      <Button variant="primary" onClick={handleLogIn}>
        Log In
      </Button>
    </Form>
  );
};

export default Login;
