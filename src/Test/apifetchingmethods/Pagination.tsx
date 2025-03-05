import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

interface Post {
  id: number;
  title: string;
}

const Pagination = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const postsPerPage = 20;

  useEffect(() => {
    const fetchPosts = async () => {
      setPosts([]);
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${
          currentPage + 1
        }&_limit=${postsPerPage}`
      );
      const data = await res.json();
      const totalPosts = res.headers.get("X-Total-Count");

      setPosts(data);
      setTotalPages(
        totalPosts ? Math.ceil(Number(totalPosts) / postsPerPage) : 0
      );
    };

    fetchPosts();
  }, [currentPage]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <h2>Paginated Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Pagination;
