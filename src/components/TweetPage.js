import CreatForm from "./CreatForm";
import AppContext from "./libs/AppContext";
import TweeetList from "./TweetList";
import { useContext } from "react";

const TweetPage = () => {
  const { tweets } = useContext(AppContext);
  return (
    <div>
      <div className="list-tweet">
        <CreatForm />
      </div>
      <div>
        {tweets.map((tweet) => (
          <TweeetList
            key={tweet.id}
            userName={tweet.userName}
            content={tweet.content}
            date={tweet.date}
            tweet={tweet}
          />
        ))}
      </div>
    </div>
  );
};

export default TweetPage;
