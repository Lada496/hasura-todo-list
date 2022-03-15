import { gql, useSubscription } from "@apollo/client";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import LoadingTodos from "./LoadingTodos";

const TODOS_UPDATED = gql`
  subscription MySubscription {
    todo(order_by: { date: desc }) {
      id
    }
  }
`;

// const GET_TODOS = gql`
//   query {
//     todos {
//       id
//       content
//       isDone
//     }
//   }
// `;

const TodosList = () => {
  // const { loading, error, data } = useQuery(GET_TODOS);

  const { loading, error, data } = useSubscription(TODOS_UPDATED);

  if (loading) return <LoadingTodos />;
  if (error) return <p className="p4 text-center">Error :( Plz try reload!</p>;

  return (
    <div className="p-4 m-auto max-w-sm bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <ul role="list" className="my-7 space-y-5">
        {loading &&
          [1, 2, 3].map((num) => (
            <li key={num}>
              <div
                data-placeholder
                className="mb-2 h-5 w-full overflow-hidden relative bg-gray-200"
              ></div>
            </li>
          ))}
        {data?.todo.length === 0 ? (
          <p>No todos!</p>
        ) : (
          data.todo.map((todo) => <TodoItem key={todo.id} id={todo.id} />)
        )}
      </ul>
      <TodoForm />
    </div>
  );
};

export default TodosList;
