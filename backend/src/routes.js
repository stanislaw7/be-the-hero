const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate') 

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

//Criação de sessão
routes.post('/sessions', celebrate({
  [Segments.BODY] : Joi.object().keys({
    id: Joi.string().required(),
  }),
}), SessionController.create )

//Listagem de ONG
routes.get('/ongs', OngController.index)
//Criação de ONG
routes.post('/ongs', celebrate({
  [Segments.BODY] : Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  }) 
}), OngController.create)

//Busca de incidentes de uma ONG especifica
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    auth: Joi.string().required(),
  }).unknown()
}), ProfileController.index)

//Busca de incidentes
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), IncidentController.index)
//Criação de incidentes
routes.post('/incidents', celebrate({
  [Segments.BODY] : Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    auth: Joi.string().required(),
  }).unknown(),
}), IncidentController.create)
//Exclusão de incidentes
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), IncidentController.delete)

module.exports = routes;
