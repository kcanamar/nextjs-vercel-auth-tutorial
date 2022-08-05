import client from "../../lib/sanity/client"

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            // JSON arrives as a string
            // convert into JS object with JSON.parse()
            const newTodo = await JSON.parse(req.body)
            // then use Sanity client to creat a new todo doc
            try {
                await client.create({
                    _type: "todo",
                    text: newTodo.text,
                    isCompleted: false,
                    createdAt: new Date().toISOString(),
                    dueDate: new Date().toISOString(),
                    userEmail: newTodo.user,
                })
                .then((res) => {
                    console.log(`Todo was created, document id is ${res._id}`)
                })
                res.status(200).json({message: `Todo was created, document ID is ${res._id}`})
            } catch (error) {
                console.log(error)
                res.status(500).josn({ message: "Error, check console"})
            }

            break;
        
        case "PUT":
            const result = await client
                .patch(req.body.id._id)
                .set({
                    isCompleted: !req.body.isCompleted,
                    // create new complete data if todo is marked done
                    completedAt: !!req.body.isCompleted ? "" : new Date().toISOString(),
                })
                .commit();

            res.status(200).json({
                status: result.isCompleted,
                completedAt: result.completedAt,
            });

            break;

        case "DELETE":
            await client
                .delete(req.body)
                .then((res) => {
                    res.body
                })
                .then((res) => console.log(`Todo was deleted`))

            res.status(200).json({ message: "Success"})

            break;
    }
}