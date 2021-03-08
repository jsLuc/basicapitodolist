const { response } = require('express')
const express = require('express')
const server = express()
server.use(express.json())

const projects = []

const reqCount = (req, res, next) => {
    console.count(req)
    return next()
}

const verifyProjectExists = (req, res, next) => {
    if(!projects[req.params.id])
        return res.status(400).json({error:"Project doesn't exists"})

    return next()
}

server.post('/projects', (req, res) => {
    const { id, title } = req.body
    
    const projecttemp = {
        id,
        title,
        task: []
    }
    
    projects.push(projecttemp)
    
    return res.json(projects)
})

server.get('/projects', (req, res) => {
    return res.json(projects)
})

server.put('/projects/:id', verifyProjectExists, (req, res) => {
    const { id } = req.params
    const { title } = req.body
    projects[id].title = title 

    return res.json(projects)
})

server.delete('/projects/:id', verifyProjectExists, (req, res) => {
    const { id } = req.params

    projects.splice(id, 1)

    return res.json(projects)
})

server.post('/projects/:id/task', verifyProjectExists, (req, res) => {
    const { id } = req.params
    const { title } = req.body

    projects[id].task.push(title)

    return res.json(projects)
})

server.listen(3000)