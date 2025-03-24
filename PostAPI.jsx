import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 4; // Number of posts per page

  useEffect(() => {
    axios
      .get("https://dummy-json.mock.beeceptor.com/posts")
      .then((response) => {
        console.log("API Response:", response.data); // Debugging
        setPosts(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to fetch blog posts");
        setLoading(false);
      });
  }, []);

  const offset = currentPage * postsPerPage;
  const currentPosts = posts.slice(offset, offset + postsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-3">Latest Blog Posts</h2>
      <div className="row">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <div key={post.id} className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{post.title || "Untitled Post"}</h5>
                  <p className="card-text">
                    {post.body ? post.body.substring(0, 100) + "..." : "No content available."}
                  </p>
                  <p className="text-muted">Author: {post.author || "Unknown"}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No posts available</p>
        )}
      </div>

      {/* Pagination Component */}
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={posts.length > 0 ? Math.ceil(posts.length / postsPerPage) : 1}
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

export default PostsList;
