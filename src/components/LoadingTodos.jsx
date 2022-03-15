const LoadingTodos = () => {
  return (
    <div className="p-4 m-auto max-w-sm bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <ul role="list" className="my-7 space-y-5">
        {[1, 2, 3].map((num) => (
          <li key={num}>
            <div
              data-placeholder
              className="mb-2 h-5 w-full overflow-hidden relative bg-gray-200"
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoadingTodos;
