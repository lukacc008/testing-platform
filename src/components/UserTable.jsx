import React, { useEffect, useState } from "react";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  useEffect(() => {
    // Fetch data from the correct backend URL
    const fetchData = async () => {
      try {
        // Update URL to match your backend server port
        const response = await axios.get("http://localhost:3500/test-results");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setUsers(sortedUsers);
  };

  return (
    <div>
      <h1>User Data Table</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>
              <button onClick={() => sortData("_id")}>ID</button>
            </th>
            <th>
              <button onClick={() => sortData("username")}>Username</button>
            </th>
            <th>
              <button onClick={() => sortData("email")}>Email</button>
            </th>
            <th>
              <button onClick={() => sortData("correctAnswersShare")}>
                Correct Answers
              </button>
            </th>
            <th>
              <button onClick={() => sortData("skippedAnswersShare")}>
                Skipped Answers
              </button>
            </th>
            <th>
              <button onClick={() => sortData("wrongAnswersShare")}>
                Wrong Answers
              </button>
            </th>
            <th>
              <button onClick={() => sortData("createdAt")}>Created At</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.correctAnswersShare}</td>
              <td>{user.skippedAnswersShare}</td>
              <td>{user.wrongAnswersShare}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
