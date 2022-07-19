import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { orderBy } from "lodash";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [value, setValue] = useState("");
  const [orderByMethod, setOrderByMethod] = useState("desc");
  const loadQuestions = async () => {
    await axios
      .get("http://localhost:8000/questions")
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleOrderChange = (e) => {
    setOrderByMethod(e.target.value);
  };

  const handleReset = () => {
    loadQuestions();
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    return await axios
      .get(`http://localhost:8000/questions?q=${value}`)
      .then((response) => {
        setQuestions(response.data);
        setValue("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.inputDiv}>
          <input
            type="text"
            className={styles.search}
            placeholder="Beer?.."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className={styles.srcBtnDiv}>
          <button type="submit" className={styles.searchBtn}>
            Search
          </button>
          <button onClick={() => handleReset()} className={styles.searchBtn}>
            Reset
          </button>
        </div>
      </form>

      <div className={styles.homeDiv}>
        <h3 className={styles.allQuestions}>All Questions</h3>
        <div className={styles.selectDiv}>
          <select
            value={orderByMethod}
            onChange={handleOrderChange}
            className={styles.orderBySelect}
          >
            <option value="asc">The oldest top</option>
            <option value="desc">The latest top</option>
          </select>
        </div>
        <div className={styles.questionsDiv}>
          {orderBy(questions, ["created_at"], [orderByMethod]).map(
            (question, i) => (
              <div className={styles.questionCard} key={question.id}>
                <Link to={`/questions/${question.id}`}>
                  <h4 className={styles.questionH4}>{question.question}</h4>
                </Link>
                <div>
                  <p className={styles.questionP}>{question.created_at}</p>
                  <p className={styles.questionEdited}>
                    {question.edited == true && "edited📝"}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
