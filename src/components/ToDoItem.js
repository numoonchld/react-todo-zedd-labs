import React, { useState } from 'react'

function ToDoItem({ todoItem }) {
    console.log({ todoItem })

    const [isEditing, setIsEditing] = useState(false)
    const [todoTitle, setTodoTitle] = useState(todoItem.title)
    const [todoDescription, setTodoDescription] = useState(todoItem.description)
    const [todoDueDate, setTodoDueDate] = useState(todoItem.dueDate)


    const handleToDoEdit = () => {
        setIsEditing(true)
    }

    const handleToDoEditSave = () => {
        setIsEditing(false)

        console.log({ todoTitle, todoDescription, todoDueDate })

        const currentToDoID = todoItem.id
        const updatedToDoItem = {
            id: currentToDoID,
            title: todoTitle.trim(),
            description: todoDescription.trim(),
            dueDate: todoDueDate
        }

        const existingTodos = JSON.parse(localStorage.getItem('todos'))
        let newTodos = existingTodos.filter(todo => todo.id !== todoItem.id)
        newTodos = [updatedToDoItem, ...newTodos]
        localStorage.setItem('todos', JSON.stringify(newTodos))

        window.location.reload()

    }

    const handleToDoDelete = () => {
        const existingTodos = JSON.parse(localStorage.getItem('todos'))
        const newTodos = existingTodos.filter(todo => todo.id !== todoItem.id)
        localStorage.setItem('todos', JSON.stringify(newTodos))
        window.location.reload()
    }

    return (
        <article className="alert alert-primary">
            {!isEditing && <>
                <div className='d-flex flex-row justify-content-between'>
                    <span>
                        <h5>{todoTitle}</h5>
                        <p>{todoDescription}</p>
                    </span>
                    <span>
                        <span>Due: </span>
                        <time dateTime={todoDueDate}>{todoDueDate}</time>
                    </span>
                </div>
            </>
            }
            {isEditing && <>
                <form className='mb-3'>
                    <input
                        className="form-control"
                        type='text'
                        value={todoTitle}
                        onChange={(e) => setTodoTitle(e.target.value)}
                    />
                    <br />
                    <textarea
                        className="form-control"
                        value={todoDescription}
                        onChange={(e) => setTodoDescription(e.target.value)}
                    > </textarea>
                    <input
                        className="form-control mt-3"
                        type='date'
                        min={new Date().toISOString().split("T")[0]}
                        value={todoDueDate}
                        onChange={(e) => setTodoDueDate(e.target.value)}
                    />
                </form>
            </>
            }
            <div className='card p-3 d-flex flex-row justify-content-between' >
                <button className={`btn btn-warning ${isEditing ? `d-none` : null} `} onClick={handleToDoEdit} >Edit</button>
                <button className={`btn btn-success ${!isEditing ? `d-none` : null} `} onClick={handleToDoEditSave}>Save</button>
                <button className='btn btn-danger' onClick={handleToDoDelete}>Delete</button>
            </div>

        </article >
    )
}

export default ToDoItem