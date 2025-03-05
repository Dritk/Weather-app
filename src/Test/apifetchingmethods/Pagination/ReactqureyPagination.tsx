import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Comment {
  id: number;
  email: string;
}

const postsPerPage = 20;

const ReactqueryPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery<Comment[], Error>({
    queryFn: () =>
      fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${postsPerPage}`
      ).then((res) => res.json()),
    queryKey: ["comments", currentPage],
  });

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Email address of users (Page {currentPage})</h1>
      {comments?.map((comment) => (
        <h2 key={comment.id}>
          {comment.id}. {comment.email}
        </h2>
      ))}

      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default ReactqueryPagination;
