import useAuth from "../hooks/useAuth";
import Logout from "../components/Logout"
import { useState, useEffect, createContext } from "react";
import client from "../lib/sanity/client";
import TodoList from "../components/TodoList";

export const TodoContext = createContext()

export default function DashBoard() {
    const { user, loading } = useAuth()
    // create a state to store new todo
    const [todoList, setTodoList] = useState([])
    // create state for the text in the todo input form
    const [userInput, setUserInput] = useState("")
    // set an error message if input is missing
    const [errMessage, setErrMessage] = useState("")

    // fetch the todos for the logged in user
    const fetchTodos = async () => {
        let fetchedTodos;
        // check if the user is loaded
        if (!loading) {
            // pass userEmail as a query parameter
            fetchedTodos = await client.fetch(`*[_type=="todo"] | order(createdAt desc) 
                {_id, text, createdAt, dueDate, isCompleted, completedAt, userEmail}`,
                {
                    userEmail: user.email,
                });
                // insert our response in the todoList state
                setTodoList(fetchedTodos)
        }
    }

    useEffect(
        () => {
            // fetch todos on page load...
            fetchTodos()
        },[loading, user]);
        // dependency array defines when React to re-run this hook
        // when an element in the array changes

    // for input form
    const handleChange = async (event) => {
        event.preventDefault()
        setUserInput(event.target.value)
    }
    
    // for the submit button
    const handleSubmit = async (event) => {
        event.preventDefault()
        // if the form is empty set error message
        if (userInput.length == 0) {
            setErrMessage("Todo text and due date must be filled out")
        } else {
            // send todo to the API
            await fetch("/api/todo", {
                method: "POST",
                body: JSON.stringify({
                    text: userInput,
                    user: user.email,
                }),
            });
            // after submission of new Todo, TodoList will refresh
            await fetchTodos()
            setUserInput("")
            setErrMessage("")
        }
    }

    // handleDelete function
    const handleDelete = async (selectedTodo) => {
        await fetch("/api/todo", {
            method: "DELETE",
            body: selectedTodo._id,
        })
        // refresh todos after deletion
        await fetchTodos()
    }

    // console.log(todoList, "<< current list")

    return (
        <TodoContext.Provider value={{handleDelete, fetchTodos}}>
            <Logout />
            <h1>DashBoard</h1>
            {loading ? 'Loading...' : user.email}
            <br/>
            <form>
                <div className="">
                    <label>Your todo</label>
                    <input 
                        type="text"
                        // state
                        value={userInput}
                        placeholder="todo goes here"
                        // handleChange function
                        onChange={handleChange}
                    />
                </div>{" "}
                <button
                    onClick={handleSubmit}
                >
                    submit
                </button>
                <p>{errMessage}</p>
            </form>
            <div>
                <h1>Your Todos</h1>
                {loading ? ("Loading...") : (<TodoList user={user} todoList={todoList}/>)}
            </div>
        </TodoContext.Provider>
    )
};