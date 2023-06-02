import { useState } from "react";
import Textarea from "./Textaera";

const CreatTweet = ({ tweet }) => {
  const [tweetText, setTweetText] = useState("");
  const handleChange = (event) => {
    setTweetText(event.target.value);
  };

  const handleTweetSave = () => {
    if (tweetText.trim().length > 0) {
      setTweetText("");
    }
  };
  return <Textarea />;
};

export default CreatTweet;
