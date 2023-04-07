import { useEffect, useState } from 'react';
import NewToDoForm from './components/NewToDoForm';
import ToDoList from './components/ToDoList';
import { useAuthContext } from './hooks/useAuthContext';
import Authentication from './components/Authentication';

function App() {


  const { user, dispatch } = useAuthContext()
  const [allTodos, setAllTodos] = useState(JSON.parse(localStorage.getItem('todos')))

  const initializeLocalStorage = async () => {

    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    }
    if (localStorage.getItem('users') === null) {
      localStorage.setItem('users', JSON.stringify([]))
    }
    if (localStorage.getItem('loggedIn') === null) {
      localStorage.setItem('loggedIn', JSON.stringify(false))
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
      {!user && <>

        <Authentication />


      </>}
      {user && <>
        <button
          className='badge badge-danger btn btn-danger mb-5'
          onClick={() => {
            dispatch({ type: "LOGOUT" })
            localStorage.setItem('loggedIn', JSON.stringify(false))
          }}>
          Logout
        </button>
        <NewToDoForm setAllTodos={setAllTodos} />
        <hr />
        <ToDoList user={user} allTodosGlobalState={allTodos} setAllTodosGlobalState={setAllTodos} />
      </>}
    </div>
  );
}

export default App;
