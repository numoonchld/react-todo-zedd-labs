import React, { useEffect, useState } from 'react'
import ToDoItem from './ToDoItem'


function ToDoList() {

    const [allTodos, setAllTodos] = useState([])
    const [filterTerm, setFilterTerm] = useState('')

    const loadAllTodos = async () => {
        setAllTodos(JSON.parse(localStorage.getItem('todos')))
    }

    useEffect(() => {
        loadAllTodos()
    }, [])


    const epochFromDate = (date) => {
        return Date.parse(new Date(date.toString()))
    }

    const sortToDosNewestFirst = () => {
        const copyArray = [...allTodos]
        copyArray.sort((a, b) => epochFromDate(a.dueDate) - epochFromDate(b.dueDate))
        setAllTodos(copyArray)
    }

    const sortToDosOldestFirst = () => {
        const copyArray = [...allTodos]
        copyArray.sort((a, b) => epochFromDate(b.dueDate) - epochFromDate(a.dueDate))
        setAllTodos(copyArray)
    }

    const onReset = () => {
        setAllTodos(JSON.parse(localStorage.getItem('todos')))
    }

    return (
        <section className='card p-3'>
            <h4 className='card-header mb-3'> Your to-dos </h4>
            <div className='my-3 d-flex'>
                <button className='btn btn-info badge' onClick={sortToDosNewestFirst}>Newest first</button>
                <button className='btn btn-info badge mx-3' onClick={sortToDosOldestFirst}>Oldest first</button>
                <input placeholder="filter to-dos" className='form-control mx-3' type='text' value={filterTerm} onChange={(e) => setFilterTerm(e.target.value)} />
                <button className='btn btn-primary badge' onClick={onReset}>Reset</button>
            </div>
            {allTodos.filter(todoItem => todoItem.title.includes(filterTerm) || todoItem.description.includes(filterTerm)).map(todoItem => <ToDoItem key={todoItem.id} todoItem={todoItem} />)}
        </section>
    )
}

export default ToDoList