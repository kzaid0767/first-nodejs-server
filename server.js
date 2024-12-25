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
    if(passedUrl.pathname === '/' && req.method === 'GET'){
        res.writeHead(200, {'content-type': 'text/plain'})
        res.end('Response from server')
    } else if (passedUrl.pathname === '/about' && req.method === 'GET'){
        res.writeHead(200,{'content-type':'text/html'})
        res.end('<h1>This is the about page</h1>')
    }else {
        res.writeHead(404, {'content-type': 'text/plain'})
        res.end('404 page not found')
    }
}

const server = http.createServer(requestHandler)

const port = 3000

server.listen(port, ()=>{
    console.log(`Server listening on http://localhost:${port}`)
})

























