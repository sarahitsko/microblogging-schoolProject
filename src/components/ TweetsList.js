import TweetForm from "./TweetForm";
import CreatForm from "./CreatForm";

const TweetList = ({ Tweets, handleAddTweet }) => {
  return (
    <div>
      <div className="list-tweet">
        <CreatForm handleAddTweet={handleAddTweet} />
      </div>
      {Tweets.map((Tweet) => (
        <TweetForm
          key={Tweet.id}
          id={Tweet.id}
          text={Tweet.text}
          date={Tweet.date}
        />
      ))}
    </div>
  );
};

export default TweetList;
