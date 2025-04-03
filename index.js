const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const app = express()
const port = 3000

app.use(express.json())
///app.use(cors())
app.use(cors({
    origin: 'http://localhost:5173/'
}));

app.post('/scores', async (req, res) => {
    const { tag, score, character, weapon } = req.body
    const existentScore = await prisma.highScore.findFirst({
        where: { tag: tag }
    })
    if (existentScore) {
        if(score > existentScore.score) {    // --- DATA UPDATE IF GREATER
            await prisma.highScore.update({  
                where: { tag: tag }, data: {
                    score: score
                }
            })
            res.json({message: "NEW HIGHSCORE!!!"})    
         } else { res.json({message: "HIJO PONTE A ENTRENAAAR!!"}) }
    }else {
        const newScore = await prisma.highScore.create({
            data: {
                tag,
                score,
                character,
                weapon
            }
        })
        res.json({ newScore: newScore, message: "NEW HIGHSCORE!!!"})
    }
    
})

app.get('/scores', async (req, res) => {
    const scores = await prisma.highScore.findMany({
        orderBy: {
            score: 'desc'
        }
    });
    res.send(scores)
})

app.listen(port, () => {
    console.log(`Larga noche de consuelo escuchando en http://localhost:${port}`)
})