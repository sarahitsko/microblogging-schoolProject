import { auth, db } from "../components/firebase";
import { useState, useEffect } from "react";
import { storage } from "../components/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../components/firebase";

const ProfilePicture = () => {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
  );

  function handleProfilePicture(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }
  function handleClickUpload() {
    const photoRef = ref(storage, "image");
    uploadBytes(photoRef, photo)
      .then(() => {
        getDownloadURL(photoRef)
          .then((photoURL) => {
            setPhotoURL(photoURL);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setPhoto(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  useEffect(() => {
    if (currentUser) {
      setPhotoURL(currentUser.photoURL);
      console.log(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <div className="upload">
      <input type="file" onChange={handleProfilePicture} />

      <button disabled={loading || !photo} onClick={handleClickUpload}>
        Uplode
      </button>
      <img src={photoURL} alt="Avater" className="avatar" />
    </div>
  );
};

export default ProfilePicture;
