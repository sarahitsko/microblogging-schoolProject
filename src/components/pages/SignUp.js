import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, provider } from "../firebase";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { GoogleButton } from "react-google-button";

function SignUp() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    password: "",
    repassword: "",
  });
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (userInfo.password === userInfo.repassword) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          userInfo.email,
          userInfo.password
        );
        const newUser = {
          userName: userInfo.userName,
          email: userInfo.email,
          password: userInfo.password,
        };

        await setDoc(doc(db, "users", userCredential.user.uid), newUser);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      alert("email already in use");
    }
    console.log(userInfo);
    setUserInfo({ userName: "", email: "", password: "", repassword: "" });
  };
  const handlesignInWithPopup = async (e) => {
    e.preventDefault();
    try {
      signInWithPopup(auth, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      });
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    }
  };

  return (
    <Form className="d-flex w-30 signUpContainer ">
      <Form.Group className="mb-3 w-75 ">
        <Form.Label>Name</Form.Label>
      </Form.Group>
      <Form.Control
        className="mb-3 w-75 "
        id="userName"
        type="text"
        placeholder="Enter Name"
        onChange={handleChange}
        value={userInfo.userName}
      />
      <Form.Group className="mb-3 w-75 ">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={handleChange}
          id="email"
          value={userInfo.email}
        />
        {""}
      </Form.Group>
      <Form.Group className="mb-3 w-75">
        <Form.Label>Password</Form.Label>
        <Form.Control
          id="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={userInfo.password}
        />
        <Form.Group className="mb-3 w-75 new-password"></Form.Group>
        <Form.Label>Re-Password</Form.Label>
        <Form.Control
          id="repassword"
          type="password"
          placeholder="repassword"
          onChange={handleChange}
          value={userInfo.repassword}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSignUp}>
        Sign Up
      </Button>
      <div className="googleButton">
        <GoogleButton onClick={handlesignInWithPopup}></GoogleButton>
      </div>
    </Form>
  );
}

export default SignUp;
