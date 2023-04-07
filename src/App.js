
import { useEffect } from 'react';
import NewToDoForm from './components/NewToDoForm';
import ToDoList from './components/ToDoList';

function App() {

  const initializeLocalStorage = async () => {

    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))

    }
  }

  useEffect(() => {
    initializeLocalStorage()
  }, [])

  return (
    <div
      className="container d-flex flex-column justify-content-center overflow-auto my-5"
      style={{ minHeight: "90vh" }}
    >
      <NewToDoForm />
      <hr />
      <ToDoList />
    </div>
  );
}

export default App;
