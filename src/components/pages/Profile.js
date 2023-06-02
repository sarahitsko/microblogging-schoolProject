import "bootstrap/dist/css/bootstrap.css";
import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useAuth, upload, db, userRef } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import ProfilePicture from "../ProfilePicture ";
import { useNavigate, Link } from "react-router-dom";

const Profile = (props) => {
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState();

  // const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  const onNameChange = (event) => {
    setProfileName(event.target.value);
    const userRef = doc(userRef, "users", currentUser.uid);
    upload(currentUser);
    setDoc(userRef, {
      displayName: "displayName",
      userId: currentUser.uid,
    });
    navigate("/Home");
  };

  return (
    <Container>
      <ProfilePicture />
      <div className="pageContainer d-flex flex-column align-items-center">
        <div className="container d-flex flex-column">
          <div className="testme">
            <h1 className="d-6 text-white font-weight-normal">Profile</h1>
            <h6 className="text-white font-weight-light">User Name</h6>
          </div>
          <form>
            <div className="inputData">
              <input
                onChange={onNameChange}
                placeholder="Insert Name"
                value={profileName}
                type="text"
                className="inputControl"
              ></input>
            </div>
            <div className="inputData">
              <div className="d-flex">
                {/* <input
                  type="file"
                  onChange={handleChange}
                  className="text-white"
                ></input> */}
                {/* <button disabled={loading || !photo} onClick={handleClick}>
                  // Uplode //{" "}
                </button> */}
                {/* <img
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  }
                  alt="avatar"
                  className="avatar text-white"
                />*/}
              </div>
            </div>
            <div className="d-flex flex-row-reverse">
              <button
                className="btn btn-primary my-3"
                onClick={() =>
                  localStorage.setItem(
                    "new-Username",
                    JSON.stringify(profileName),
                    setProfileName(""),
                    upload(currentUser)
                  )
                }
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Profile;

// import Button from "react-bootstrap/Button";
// import { useState, useContext } from "react";
// import AppContext from "../libs/AppContext";
// import ProfilePicture from "../ProfilePicture ";

// const Profile = () => {
//   const [currentUserName, setCurrentUserName] = useState("");
//   const [profileName, setProfileName] = useState();
//   // const { ChangeUserName } = useContext(AppContext);
//   const onNameChange = (event) => {
//     setProfileName(event.target.value);
//   };
//   function handleClick() {
//     upload(photo, currentUser, setLoading);
//     const userRef = doc(userRef, "users", currentUser.uid);
//     setDoc(userRef, {
//       displayName: "displayName",
//       userId: currentUser.uid,
//       image: photoURL,
//     });
//   }
//   // useEffect(() => {
//   //   if (currentUser) {
//   //   setPhotoURL(currentUser.photoURL)
//   //   console.log(currentUser.photoURL)
//   //   }
//   // }, [currentUser])

//   return (
//     <div className="main-container">
//       <div className="Header">
//         <h1>Profile</h1>
//         <span className="username">User Name</span>
//       </div>
//       <div className="userContainer">
//         <form className="userForm" onSubmit={handleSubmit}>
//           <input
//             className="userInput"
//             type="text"
//             // id="username"
//             autoComplete="off"
//             onChange={(e) => onNameChange(e.target.value)}
//             value={currentUserName}
//             required
//           />
//           <div className="userB">
//             <Button variant="primary" onClick={handleClick}>
//               Save
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Profile;
