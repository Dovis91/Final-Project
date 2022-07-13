import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";

const Home = ({ userLoggedIn }) => {
  const [questions, setPost] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/questions")
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h3 className={styles.allQuestions}>All Questions</h3>
      <div className={styles.questionsDiv}>
        {questions.map((question) => (
          <div className={styles.questionCard} key={question.id}>
            <h4 className={styles.questionH4}>{question.question}</h4>
            <p className={styles.questionP}>{question.created_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
