import TodosList from "./components/TodosList";

function App() {
  return (
    <>
      <h1 className="my-5 text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
        Your Todo List
      </h1>
      <TodosList />
    </>
  );
}

export default App;
