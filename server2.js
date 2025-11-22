// const http = require('http')
// const PORT = 3000

// const server = http.createServer((req,res)=>{

//     if(req.method === 'GET'){
//         if(req.url === '/'){
//         res.writeHead(200, {'Content-Type': 'text/html'})
//         res.end("<h1>Hello this is home page!</h2>")
//     }else if(req.url === '/about'){
//         res.writeHead(200, {'Content-Type': 'text/html'})
//         res.end("<h1>Hello this is about page!</h1>")
//     }else{
//         res.writeHead(404, {'content-type': 'application/json'})
//         res.end(JSON.stringify({message: "page not found"}))
//     }
//     }
// })

// server.listen(PORT, ()=> {
//     console.log("The server is running on port 3000!")
// })