// Configuração incial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Forma de ler JSON / Middlewares
app.use(
    express.urlencoded({
      extended: true,
    }),
  )

  app.use(express.json())

// Rota da API
const userRoutes = require('./routes/userRoutes')

app.use('/user', userRoutes)

// Rota inicial / EndPoint
app.get('/gc', (req, res) => {
    res.json({message: 'Oi express!'})
})

//Login e Senha
const login = process.env.LOGIN
const password = encodeURIComponent(process.env.PASSWORD)

// Entregar uma porta
mongoose.connect(`mongodb+srv://${login}:${password}@cluster0.uazso.mongodb.net/HelpDesk?retryWrites=true&w=majority`)
.then(() => {
  console.log('Logamos com MongooDB')
  app.listen(3000)
})
.catch((err) => console.log(err))
