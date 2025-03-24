import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 5; // Change as needed

  useEffect(() => {
    axios
      .get("https://fake-json-api.mock.beeceptor.com/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  const offset = currentPage * usersPerPage;
  const currentUsers = users.slice(offset, offset + usersPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-3">Users List</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Component */}
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={Math.ceil(users.length / usersPerPage)}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default UsersTable;
