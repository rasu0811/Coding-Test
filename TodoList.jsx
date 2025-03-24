import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const todosPerPage = 5; // Number of tasks per page

  useEffect(() => {
    axios
      .get("https://dummy-json.mock.beeceptor.com/todos")
      .then((response) => {
        console.log("API Response:", response.data); // Debugging
        setTodos(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to fetch To-Do tasks");
        setLoading(false);
      });
  }, []);

  const offset = currentPage * todosPerPage;
  const currentTodos = todos.slice(offset, offset + todosPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-3">To-Do Tasks</h2>
      <div className="row">
        {currentTodos.length > 0 ? (
          currentTodos.map((todo) => (
            <div key={todo.id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{todo.title || "Untitled Task"}</h5>
                  <p className={`badge ${todo.completed ? "bg-success" : "bg-warning"}`}>
                    {todo.completed ? "Completed" : "Pending"}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No tasks available</p>
        )}
      </div>

      {/* Pagination Component */}
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={todos.length > 0 ? Math.ceil(todos.length / todosPerPage) : 1}
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

export default TodoList;
