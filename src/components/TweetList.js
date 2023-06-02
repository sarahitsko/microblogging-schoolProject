import TextareaAutosize from "react-textarea-autosize";
import Form from "react-bootstrap/Form";

import { db } from "./firebase";

const TweeetList = ({ content, date, userName }) => {
  return (
    <div className="list">
      <Form className="list Tweet d-flex column w-50 m-auto">
        <Form.Group className="tweet-list">
          <div className="firstRow">
            <small>{userName}</small>
            <small>{date}</small>
          </div>
          <TextareaAutosize
            tweet={{ content, date }}
            className="formTextArea box"
            minRows={2}
            value={content}
          ></TextareaAutosize>
        </Form.Group>
      </Form>
    </div>
  );
};

export default TweeetList;
