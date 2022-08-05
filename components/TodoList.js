import Todo from "./Todo"

export default function TodoList({ todoList, user }) {
    return (
        <section>
            <ul>
                {/* check for todos */}
                {
                    todoList.length >= 1 
                        ? todoList.map((todo) => {
                            // map over only the users todos
                            return user.email === todo.userEmail ? ( <Todo key={todo._id} todo={todo} /> ) : ("")}) 
                        : "Enter a todo"
                }
            </ul>
        </section>
    )
}