import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./SingleQuestion.module.css";

const SingleQuestion = ({ userLoggedIn, userId }) => {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [editableId, setEditableId] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  const getQuestion = async () => {
    await axios
      .get(`http://localhost:8000/questions/${id}`)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAnswers = async () => {
    await axios
      .get(`http://localhost:8000/questions/${id}/answers`)
      .then((res) => {
        setAnswers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAnswer(answer);
  };

  const handleAnswerDelete = (id) => {
    axios
      .delete(`http://localhost:8000/answers/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        alert("Qestion deleted");
        getAnswers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateAnswer = async (id) => {
    await axios
      .put(
        `http://localhost:8000/answers/${id}`,
        {
          answer: editAnswer,
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        alert("update");
        setEditableId("");
        getAnswers();
      });
  };

  const createAnswer = async (answer) => {
    await axios
      .post(
        `http://localhost:8000/questions/${id}/answer`,
        {
          answer: answer,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        setAnswer("");
        getAnswers();
      });
  };

  useEffect(() => {
    getQuestion();
    getAnswers();
  }, []);

  return (
    <>
      <div className={styles.singleQDiv}>
        {question && (
          <article>
            <h3 className={styles.sglQh3}>{question.question}</h3>
          </article>
        )}
      </div>
      <h3 className={styles.h3Answer}>Answers:</h3>
      {answers.map((answer) => (
        <div className={styles.answerDiv} key={answer.id}>
          <div className={styles.answerPDiv}>
            <p className={styles.answerP}>{answer.answer}</p>
            <p className={styles.answerEdited}>
              {answer.edited == true && "edited📝"}
            </p>
          </div>
          {answer.user_id == userId && userLoggedIn && (
            <>
              {editableId == answer.id ? (
                <div>
                  <input
                    className={styles.editInput}
                    type="text"
                    placeholder="Edit answer..."
                    onChange={(e) => {
                      setEditAnswer(e.target.value);
                    }}
                  />
                  <button
                    className={styles.singleQbtn}
                    onClick={() => updateAnswer(answer.id)}
                  >
                    Update
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.btnEditDiv}>
                    <button
                      className={styles.singleQbtn}
                      onClick={() => setEditableId(answer.id)}
                    >
                      EDIT
                    </button>
                    <button
                      className={styles.btnDel}
                      onClick={() => handleAnswerDelete(answer.id)}
                    >
                      DEL
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      ))}
      {userLoggedIn ? (
        <div className={styles.create}>
          <h3 className={styles.formH3}>Type your answer</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              className={styles.formText}
              name=""
              id=""
              cols="30"
              rows="10"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            ></textarea>
            <button className={styles.singleQbtn}>Post</button>
          </form>
        </div>
      ) : (
        <div className={styles.create}>
          <h3 className={styles.formH3}>Type your answer</h3>
          <form>
            <textarea
              className={styles.formText}
              cols="30"
              rows="10"
            ></textarea>
            <Link to="/login">
              <span className={styles.forgot}>You have to Log in first</span>
            </Link>
            <br />
            <span className={styles.forgot}>or</span>
            <br />
            <Link to="/">
              <span className={styles.forgot}>Back to home page</span>
            </Link>
          </form>
        </div>
      )}
    </>
  );
};

export default SingleQuestion;
