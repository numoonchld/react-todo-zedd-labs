import React, { useEffect, useState } from 'react'
import ToDoItem from './ToDoItem'


function ToDoList() {

    const [allTodos, setAllTodos] = useState([])

    const loadAllTodos = async () => {
        setAllTodos(JSON.parse(localStorage.getItem('todos')))
    }

    useEffect(() => {
        loadAllTodos()
    }, [])

    return (
        <section className='card p-3'>
            <h4 className='card-header mb-3'> Your to-dos </h4>
            {allTodos.map(todoItem => <ToDoItem key={todoItem.id} todoItem={todoItem} />)}
        </section>
    )
}

export default ToDoList