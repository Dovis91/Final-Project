import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UserQuestions.module.css";

const UserQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [editQuestion, setEditQuestion] = useState("");
  const [editableId, setEditableId] = useState("");

  const setQuestionsFunc = () => {
    axios
      .get(`http://localhost:8000/userquestions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setQuestionsFunc();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/userquestions/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        alert("Qestion deleted");
        setQuestionsFunc();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateQuestion = async (id) => {
    await axios
      .put(
        `http://localhost:8000/userquestions/${id}`,
        {
          question: editQuestion,
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        alert("update");
        setQuestionsFunc();
        setEditableId("");
      });
  };

  return (
    <div className={styles.homeDiv}>
      <h3 className={styles.userQuestionsH3}>Your questions</h3>
      <div className={styles.questionsDiv}>
        {questions.map((question) => (
          <div className={styles.questionCard} key={question.id}>
            <h3 className={styles.questionH4}>{question.question}</h3>
            {editableId === question.id && (
              <div>
                <input
                  className={styles.editInput}
                  type="text"
                  placeholder="Edit question..."
                  onChange={(e) => {
                    setEditQuestion(e.target.value);
                  }}
                />
                <button
                  className={styles.singleQbtn}
                  onClick={() => updateQuestion(question.id)}
                >
                  Update
                </button>
              </div>
            )}
            <div className={styles.btnEditDiv}>
              <button
                className={styles.singleQbtn}
                onClick={() => setEditableId(question.id)}
              >
                EDIT
              </button>

              <button
                className={styles.btnDel}
                onClick={() => handleDelete(question.id)}
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserQuestions;
