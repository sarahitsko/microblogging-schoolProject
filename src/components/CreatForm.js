import Button from "react-bootstrap/Button";
import TextareaAutosize from "react-textarea-autosize";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "./libs/AppContext";

const CreatForm = () => {
  const [TweetText, setTweetText] = useState("");
  const [TextLimit, setTextLimit] = useState(false);
  const { AddTweet } = useContext(AppContext);
  // const [SaveTweet, setSaveTweet] = useState(false);

  const handleChange = (newUserName) => {
    setTweetText(newUserName.target.value);
  };

  const handleLimit = (e) => {
    if (e.target.value.length > 140) {
      setTextLimit(true);
    } else {
      setTextLimit(false);
    }
  };

  const handleSaveTweet = (e) => {
    if (TweetText.trim().length > 0) {
      AddTweet(TweetText);
      setTweetText(TweetText);
      setTweetText("");
    }
  };

  return (
    <>
      <Form className="Tweet d-flex column w-50 m-auto">
        <Form.Group
          style={{
            width: "100%",
          }}
        >
          <TextareaAutosize
            className="formTextArea"
            minRows={6}
            placeholder="What you have in mind?"
            maxLength={141}
            value={TweetText}
            onChange={(e) => {
              handleChange(e);
              handleLimit(e);
            }}
          ></TextareaAutosize>
        </Form.Group>
        <div className="buttonTweet">
          <Button
            variant="primary"
            className="font w-10 h-50"
            onClick={handleSaveTweet}
          >
            Tweet
          </Button>
          <div className="alert">
            {TextLimit && (
              <Alert variant="danger" className="m-2">
                The tweet can't contain more then 140 chars.
              </Alert>
            )}
          </div>
        </div>
      </Form>
    </>
  );
};

export default CreatForm;
