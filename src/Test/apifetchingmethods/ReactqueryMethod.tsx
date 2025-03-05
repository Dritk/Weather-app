import { useQuery } from "@tanstack/react-query";

interface Comment {
  id: number;
  email: string;
}

const ReactqueryMethod = () => {
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery<Comment[], Error>({
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/comments?_limit=10").then(
        (res) => res.json()
      ),
    queryKey: ["comments"],
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error instanceof Error) {
    return <div>Error:{error.message}</div>;
  }

  return (
    <div>
      <h1>Email address of users</h1>
      {comments?.map((comment) => (
        <h2 key={comment.id}>
          {comment.id}.{comment.email}
        </h2>
      ))}
    </div>
  );
};

export default ReactqueryMethod;
