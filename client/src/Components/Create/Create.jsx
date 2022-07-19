import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Create.module.css";

const Create = () => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");

  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createQuestion(question);
  };

  const createQuestion = async (question) => {
    await axios
      .post(
        "http://localhost:8000/questions",
        {
          question: question,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setQuestions([response.data, ...questions]);
        alert("Question Added!");
      });
    setQuestion("");
    setIsPending(false);
    navigate("/");
  };

  return (
    <div className={styles.create}>
      <h3 className={styles.questiontitle}>Have something to say..?!</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className={styles.formText}
          name=""
          id=""
          cols="30"
          rows="10"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
        {!isPending && (
          <button className={styles.buttonPost}>Post Question</button>
        )}
        {isPending && (
          <button className={styles.buttonPost} disabled>
            Posting....
          </button>
        )}
      </form>
    </div>
  );
};

export default Create;
