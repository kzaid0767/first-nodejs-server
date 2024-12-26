import http from 'node:http'
import url from 'node:url'

const students = [
    {id:1, name: 'Kassim'},
    {id:2, name: 'Sharifa'},
    {id:3,name:'Fizza'}
]
const requestHandler = (req,res)=>{
    const {method, url} = req
    const partsOfUrl  = url.split('/')
    const id = Number(partsOfUrl[2])
    if(url === '/' && req.method === 'GET'){
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end('Response from server')
    } else if(url==='/students' && method==='GET'){
        res.writeHead(200, {'content-type':'applicaton/json'})
        res.end(JSON.stringify(students))
    } else if (partsOfUrl[1] && id && method ==='GET'){
        
        const data = students.find(student =>student.id === id)
        if(data){
            res.writeHead(200, {'content-type':'applicaton/json'})
            res.end(JSON.stringify(data))
        }else {
            res.writeHead(200, {'content-type':'applicaton/json'})
            res.end(JSON.stringify({message: 'no student with matching id found!'}))
        }
    } else if(method==='POST' && url==='/students'){
        let body =''
        req.on('data',(chunk)=>{
            body += chunk
        })
        req.on('end',()=>{
            const newStudent = JSON.parse(body)
            students.push(newStudent)
            res.writeHead(200, {'content-type':'applicaton/json'})
            res.end(JSON.stringify(newStudent))
        })
    }
}  

const server = http.createServer(requestHandler)
const port = 3000
server.listen(3000, ()=>{
    console.log(`Server listening on http://localhost:${port}`)
})