import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
}

const ReactFetchhook: React.FC = () => {
  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Posts of Users</h1>
      {data?.map((post) => (
        <div key={post.id}>
          <h2 className="text-red-500">{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default ReactFetchhook;
