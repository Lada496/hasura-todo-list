import { useState } from "react";
import { gql, useMutation, useSubscription } from "@apollo/client";

const POST_EDITED = gql`
  mutation ($id: uuid!, $isDone: Boolean!) {
    update_todo_by_pk(pk_columns: { id: $id }, _set: { isDone: $isDone }) {
      content
      id
      isDone
    }
  }
`;
const DELETE_POST = gql`
  mutation ($id: uuid!) {
    delete_todo_by_pk(id: $id) {
      content
      date
      id
      isDone
    }
  }
`;

const POST_UPDATED = gql`
  subscription ($id: uuid!) {
    todo_by_pk(id: $id) {
      content
      date
      id
      isDone
    }
  }
`;

const TodoItem = ({ id }) => {
  const [deleted, setDeleted] = useState(false);
  const {
    loading: todoLoading,
    error: todoError,
    data: todoData,
  } = useSubscription(POST_UPDATED, { variables: { id } });

  const [editTodo, { editData, editLoading, editEerror }] =
    useMutation(POST_EDITED);

  const [
    deleteTodo,
    { data: deletedData, loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_POST);

  const submitHandler = (isDone) => {
    editTodo({ variables: { id, isDone: !isDone } });
  };

  const deleteHandler = () => {
    setDeleted(true);
    deleteTodo({ variables: { id } });
  };

  // if (loading) return "Submitting...";
  if (editEerror || deleteError) return `Submission error!`;
  if (todoLoading || deleteLoading)
    return (
      <div
        data-placeholder
        className="mb-2 h-5 w-full overflow-hidden relative bg-gray-200"
      ></div>
    );
  if (todoError) return <li>Failed to get data. Plz try reload!</li>;
  return (
    <>
      {!deleted && todoData && (
        <div>
          <li
            className={
              todoData.todo_by_pk.isDone
                ? "flex justify-between line-through decoration-gray-500"
                : "flex justify-between"
            }
          >
            <div className="flex space-x-3">
              <button
                className="disabled:cursor-not-allowed"
                onClick={submitHandler.bind(null, todoData.todo_by_pk.isDone)}
                disabled={editLoading}
              >
                <svg
                  className={
                    todoData.todo_by_pk.isDone
                      ? "flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                      : "flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500"
                  }
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                {todoData.todo_by_pk.content}
              </span>
            </div>
            <button
              onClick={deleteHandler}
              disabled={deleteLoading}
              className="disabled:cursor-not-allowed"
            >
              <svg
                className="w-5 h-5 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>
          </li>
        </div>
      )}
    </>
  );
};

export default TodoItem;
