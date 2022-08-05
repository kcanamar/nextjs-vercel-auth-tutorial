import { useState, useContext } from "react";
import { TodoContext } from "../pages/dashboard";

export default function Todo({ todo }) {
    // useContext no need to pass extra props to <TodoList/>
    const { handleDelete, fetchTodos } = useContext(TodoContext)
    // set states for isCompleted and date completed
    const [isCompleted, setIsCompleted] = useState(todo.isCompleted)
    const [completedTime, setCompletedTime] = useState(todo.completedAt)

    // function for updateing completed checkbox with sanity
    const handleToggle = async (event) => {
        event.preventDefault()
        const result = await fetch("api/todo", {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: todo,
                // pass isCompleted React State to Sanity
                isCompleted: isCompleted,
                completedAt: todo.completedAt

            })
        })

        const { status, completedAt } = await result.json();
        // refresh our data
        await fetchTodos()
        // pass Sanity results back into React
        setIsCompleted(status)
        setCompletedTime(completedAt)
    }

    return (
        <li key={todo._id}>
            <input type="checkbox" checked={todo.isCompleted} onChange={handleToggle} />
            {/*  if todo is done, cross it out */}
            <p className={`${todo.isCompleted ? "done" : ""}`}>{todo.text}</p>
            <p className="">
                {todo.isCompleted ? `Done ${completedTime}` : `Due ${todo.dueDate}`}
            </p>
            <button
                onClick={(event) => {
                    event.preventDefault()
                    handleDelete(todo)
                }}
            >
                DELETE
            </button>
        </li>
    )
}