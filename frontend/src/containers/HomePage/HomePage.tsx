import { useState, useEffect } from "react";
import styles from "./HomePage.module.scss"
import React from "react";

const DESIRED_ASPECT_RATIO = 0.55;

export const HomePage = () => {
  const [plotWidth, setPlotWidth] = useState(920);
  const [plotHeight, setPlotHeight] = useState(460);
  const [bookInput, setBookInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const calculateSize = () => {
      const screenWidth = window.innerWidth;
      const width = Math.min(screenWidth * 0.8, 920);
      const height = width * DESIRED_ASPECT_RATIO; 

      setPlotWidth(width);
      setPlotHeight(height);
    };

    calculateSize();
    window.addEventListener("resize", calculateSize);
    return () => window.removeEventListener("resize", calculateSize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: bookInput }),
    });

    const data = await response.json();
    setRecommendations(data.recommendations);
  };

  return (
    <div className={styles.homePageContainer}>
      <h2>Book Recommender</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={bookInput}
          onChange={(e) => setBookInput(e.target.value)}
          placeholder="Enter your favorite book"
          className={styles.inputField}
        />
        <button type="submit" className={styles.submitButton}>Get Recommendations</button>
      </form>

      {recommendations.length > 0 && (
        <div className={styles.resultsContainer}>
          <h3>Recommended Books:</h3>
          <ul>
            {recommendations.map((book, index) => (
              <li key={index}>{book}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
