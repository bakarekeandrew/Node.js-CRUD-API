const http = require('http')
const fs = require('fs')
const { findPackageJSON } = require('module')
const { json } = require('stream/consumers')
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
      
    //search parameter    
    }else if(req.url.startsWith('/todo') && req.method === 'GET'){
        const urlObj = new URL(req.url, `http://${req.headers.host}`)
        const status = urlObj.searchParams.get("status")
        let tasks = JSON.parse(fs.readFileSync('task.json', 'utf-8'))

        if(status){
            tasks = tasks.filter(task => task.status === status)
            res.end(JSON.stringify(tasks))
        }
        else{
           res.end(JSON.stringify({message: "error while searching"}))
        }
    }
    else{
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: "page not found!"}))
    }
})


server.listen(PORT,()=>{
    console.log("Server is running on port 3000")
})