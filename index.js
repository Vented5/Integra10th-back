const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const app = express()
const port = 3000

app.use(express.json())

app.post('/scores', async (req, res) => {
    const { tag, score } = req.body
    const newScore = await prisma.highScore.create({
        data: {
            tag,
            score
        }
    })
    res.json(newScore)
})

app.get('/scores', async (req, res) => {
    const scores = await prisma.highScore.findMany();
    res.send(scores)
})

app.listen(port, () => {
    console.log(`Larga noche de consuelo escuchando en http://localhost:${port}`)
})