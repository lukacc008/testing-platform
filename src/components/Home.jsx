import React from "react";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "35vh", // Full viewport height
        textAlign: "center", // Center text alignment
      }}
    >
      <h1>Welcome to the Candidate Testing Platform</h1>
      <p style={{ color: "red" }}>
        NOTE: FIRST REQUEST MAY TAKE UP TO 40+ SECONDS DUE TO USING FREE
        VERSION OF RENDER
      </p>
      <p>
        This application is designed to help our company efficiently test and
        evaluate candidates for open positions. Through our online testing
        platform, candidates can complete a series of tests as part of the
        initial screening process. This allows us to identify and filter top
        candidates before moving forward in the hiring process.
      </p>
    </div>
  );
};

export default Home;
