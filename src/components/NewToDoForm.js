import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from '../hooks/useAuthContext';

function NewToDoForm({ setAllTodos }) {

    const { user } = useAuthContext()


    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')

    const handleAddToDO = async (event) => {
        event.preventDefault()

        if (title === '') {
            alert('Enter valid title!')
            return
        }
        if (description === '') {
            alert('Enter valid description!')
            return
        }
        if (dueDate === '') {
            alert('Enter valid due date!')
            return
        }

        const existingTodos = JSON.parse(localStorage.getItem('todos'))
        const newTodo = {
            id: uuidv4(),
            title: title.trim(),
            description: description.trim(),
            dueDate,
            user
        }
        const newTodos = [newTodo, ...existingTodos]

        localStorage.setItem('todos', JSON.stringify(newTodos))

        // window.location.reload()
        setAllTodos([newTodo, ...existingTodos])

    }

    return (
        <section className='card w-100 p-3'>
            <h4 className='card-header mb-3'> Add to-do </h4>
            <form onSubmit={handleAddToDO}>
                <div className="row mb-3">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="description" className="col-sm-2 col-form-label">Description:</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} > </textarea>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="due-date" className="col-sm-2 col-form-label">Due date:</label>
                    <div className="col-sm-10">
                        <input type="date" className="form-control" id="due-date" value={dueDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => setDueDate(e.target.value)} />
                    </div>
                </div>
                <button type='submit' className='btn btn-primary w-100'>Add</button>
            </form>


        </section >
    )
}

export default NewToDoForm