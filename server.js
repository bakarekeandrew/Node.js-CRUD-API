const http = require('http')
const fs = require('fs')
const PORT = 3000
// const url = '/todo'
require('./task.json')



const server = http.createServer((req,res)=>{
    if(req.url === '/todo' && req.method === 'GET'){
        const tasks = JSON.parse(fs.readFileSync('task.json', 'utf-8'))
        res.end(JSON.stringify(tasks))

    }
    else if(req.url === '/todo' && req.method === 'POST'){
        let body = ""
        req.on("data", chunk =>{
           body += chunk
        })
        req.on("end", ()=>{
            const newTask = JSON.parse(body)

            let tasks = JSON.parse(fs.readFileSync("task.json", 'utf-8'))

            newTask.id = Date.now();
            tasks.push(newTask);

            fs.writeFileSync("task.json", JSON.stringify(tasks, null, 2))
            res.end(JSON.stringify({message: "Task added!", task: newTask}))


        })
        
    }
    else{
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: "page not found!"}))
    }
})


server.listen(PORT,()=>{
    console.log("Server is running on port 3000")
})