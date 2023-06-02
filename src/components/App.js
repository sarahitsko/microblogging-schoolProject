import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NavBar from "./NavBar";
import { db } from "./firebase";
import AppContext from "./libs/AppContext";
import { useState, useEffect } from "react";
import PrivateRoute from "./pages/PrivateRoute";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { uid } from "uid";

const App = () => {
  const [tweets, setTweets] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  //  JSON.parse(localStorage.getItem("currentUser")) || ""
  const tweetsCollection = collection(db, "tweets");
  const usersCollection = collection(db, "users");
  const [userName, setUserName] = useState(() => {
    return JSON.parse(localStorage.getItem("userName")) || "";
  });

  const ChangeUserName = (newUsername) => {
    setUserName(userName);
  };

  const AddTweet = (text) => {
    const date = new Date().toISOString();
    const newTweet = {
      userName: userName ? userName : "Sarai",
      content: text,
      date: date,
    };
    postTweet(newTweet);
  };
  const postTweet = async (newTweet) => {
    try {
      const addedTweet = await addDoc(tweetsCollection, newTweet);
      const newTweetWithId = {
        ...newTweet,
        id: addedTweet.id,
      };

      const addedTweetArray = [newTweetWithId, ...tweets];
      setTweets(addedTweetArray);
    } catch (err) {
      console.log(err);
    }
  };
  const getAllTweets = async () => {
    try {
      const allTweetSnapShot = await getDocs(tweetsCollection, usersCollection);
      const allTweets = allTweetSnapShot.docs.map((tweets) => {
        const newTweetWithId = {
          ...tweets.data(),
          id: tweets.id,
          userName: uid,
        };

        return newTweetWithId;
      });

      setTweets(allTweets);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllTweets();
  }, []);
  const listenForChanges = () => {
    onSnapshot(tweetsCollection, (querySnapshot) => {
      const tweetsArray = [];
      querySnapshot.forEach((doc) => {
        tweetsArray.push({ ...doc.data(), id: doc.id });
      });
      setTweets(tweetsArray);
    });

    return () => {};
  };

  useEffect(() => {
    listenForChanges();
    getAllTweets();
  }, []);

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          tweets,
          ChangeUserName,
          AddTweet,
          setCurrentUser,
          getAllTweets,
        }}
      >
        <NavBar />
        <Routes>
          <Route
            path="/Home"
            element={
              <PrivateRoute currentUser={currentUser}>
                <Home />
              </PrivateRoute>
            }
          ></Route>
          <Route path="Profile" element={<Profile />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="Login" element={<Login />} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
};

export default App;
