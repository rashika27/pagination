import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch(() => alert("Failed to fetch data"));
  }, []);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(members.length / itemsPerPage);

  const handleClickNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleClickPrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = members.slice(startIndex, endIndex);

  return (
    <div className="app-container">
      <table className="members-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Member</th>
          </tr>
        </thead>
        <tbody>
          {currentMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td> {member.role} </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <button onClick={handleClickPrev} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleClickNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
