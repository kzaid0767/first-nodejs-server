/* 
1. import modules
2. define handler - handles request and responses
3. create the server
4. start the server
*/

import http from 'node:http'
import url from 'node:url'


const requestHandler = (req, res)=>{
    const passedUrl = url.parse(req.url,true)
    const pathname = passedUrl.pathname
    const query = passedUrl.query
    
    if(query && query.w){
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end(`The query is ${query.w}`)
    } else if(pathname === '/' && req.method === 'GET'){
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end('Response from server')
    } else if (pathname === '/about' && req.method === 'GET'){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.end('<h1>This is the about page</h1>')
    } else if(pathname.startsWith('/users/') && req.method === 'GET'){
        const userId = pathname.split('/')[2]
        res.writeHead(200,{'Content-Type':'text/html'})
        res.end(`<h1>This is user #${userId}</h1>`)
    }   else if(pathname === '/json' && req.method==='GET'){
        const data = {
            message: 'Hello from Kassim',
            timeStamp : Date.now()
        }
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(data))
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.end('404 page not found')
    }
}

const server = http.createServer(requestHandler)

const port = 3000

server.listen(port, ()=>{
    console.log(`Server listening on http://localhost:${port}`)
})

























