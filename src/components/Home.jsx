import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[35vh] text-center">
      <h1 className="text-xl font-bold">
        Welcome to the Candidate Testing Platform
      </h1>
      <p className="text-red-500">
        NOTE: FIRST REQUEST MAY TAKE UP TO 40+ SECONDS DUE TO USING FREE
        VERSION OF RENDER
      </p>
      <p className="mt-4">
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
