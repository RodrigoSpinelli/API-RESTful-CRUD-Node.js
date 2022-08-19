const user = require('express').Router()
const User = require('../models/User')

// Create - Criação de usuario
user.post('/', async (req,res) => {
  
    // req.body
    const {primary_name, secundary_name, user_type, active, office, 
      customer_id, blocked} = req.body
      
      if(!primary_name){
        res.status(422).json({error: 'O Primeiro Nome é obrigatorio!'})
        return
      }
  
      const user = {
      primary_name,
      secundary_name,
      user_type,
      active,
      office,
      customer_id,
      blocked,
      }
    
    try {
      //Criar dados
      await User.create(user)
      res.status(201).json({message: 'Usuario cadastrado com sucesso!'})
    } catch (error) {
      res.status(500).json({error: error})
    }
  
  })

  // Read - Leitura de usuario

  user.get('/', async (req, res) => {
    try {

        const people = await User.find()
        res.status(500).json(people)
    } catch (error) {
        res.status(500).json({error: error})
    }
  })

  user.get('/:id', async (req, res) => {
    //Extrair o dado da requisição, pela url = req.params
    const id = req.params.id
    
    try {
        const user = await User.findOne({_id: id})
        if (!user) {
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error: error})
    }
  })

// Update - atualização do usuário (PUT, PATCH)
user.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {primary_name, secundary_name, user_type, active, office, customer_id, blocked} = req.body

    const user = {primary_name, secundary_name, user_type, active, office, customer_id, blocked}
        
    try {
        const updatedUser = await User.updateOne({_id: id}, user)
        if (updatedUser === 0) {
            res.status(422).json({message: 'Usuário não foi encontrado!'})
            return
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error: error})
    }
})
// Delete - Delatar usuário 
user.delete('/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({_id: id})
    if (!user) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
      }
    try {
        await User.deleteOne({_id: id})
        res.status(200).json({message: 'Usuário deletado com sucesso!'})
    } catch (error) {
        res.status(500).json({error: error})
    }  
})
module.exports = user