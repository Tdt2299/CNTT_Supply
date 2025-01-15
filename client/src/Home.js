import React from "react";
// import { Link } from "react-router-dom";
import Header from "./components/Header"; // Import Header component

const Home = () => {
  return (
    <div>
      <Header /> {/* Include Header */}

      {/* Main Content */}
      <main style={styles.main}>
        <h1>Welcome to the Home Page</h1>
        <p>Click on the navigation links above to explore Products or Categories.</p>
      </main>
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  header: {
    backgroundColor: "#f8f9fa",
    padding: "10px 20px",
    borderBottom: "1px solid #ddd",
  },
  nav: {
    display: "flex",
    gap: "15px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontSize: "18px",
  },
  main: {
    padding: "20px",
    textAlign: "center",
  },
};

export default Home;
