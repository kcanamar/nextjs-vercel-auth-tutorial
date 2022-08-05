import useAuth from "../hooks/useAuth";
import Logout from "../components/Logout"
import { useState } from "react";

export default function DashBoard() {
    const { user, loading } = useAuth()
    // create a state to store new todo
    const [todoList, setTodoList] = useState([])
    // create state for the text in the todo input form
    const [userInput, setUserInput] = useState("")
    // set an error message if input is missing
    const [errMessage, setErrMessage] = useState("")

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
            // await fetchTodos()
            setUserInput("")
            setErrMessage("")
        }
    }

    return (
        <div>
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
        </div>
    )
};