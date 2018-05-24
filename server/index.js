const express = require('express');

const app = express();

app.use(express.json());
// app.use(bodyParser.json())
let id = 1;
let todos = [{
    id: 1, 
    task: 'cats', 
    date: new Date()
}];

app.get('/api/todos', (req, res) => {
    // do something to array 
    res.status(200).send(todos)
})
app.post('/api/todos', (req, res) => {
    id++
    let newTodo = {
        id: id,
        task: req.body.task,
        date: new Date()
    }
    todos.push(newTodo);
    res.status(200).send(todos);
})

app.delete(`/api/todos/:id`, (req, res)=> {
    let idToDelete = parseInt(req.params.id);
    for(let i = 0; i < todos.length; i++) {
        if (todos[i].id === idToDelete) {
            todos.splice(i, 1)
        }
    }
    res.status(200).send(todos);
})

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})