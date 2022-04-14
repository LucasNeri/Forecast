const Post = require('./post')
const HttpResponse = require('../helpers/http-response')
const ViaCep = require('../services/viacep')
const ClimaTempo = require('../services/climatempo')

// Post Routes
const PostController = new Post()

const setMongoForecast = (forecast) => {
  const mongoForecast = forecast

  mongoForecast.data = forecast.data[0]
  mongoForecast.date = forecast.data.date
  mongoForecast.localeId = forecast.id
  delete mongoForecast.id

  return mongoForecast
}

const validateDate = (data, errors) => {
  //Data válida
  if (!data || !data.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)) {
    errors.push('Data inválida')
    return errors
  }

  //Data futura até 7 dias
  const today = new Date().toLocaleString()
  const date_request = new Date(data)
  let date_seven = new Date()
  date_seven.setDate(date_seven.getDate() + 6)

  if (!data || (date_request < today || date_request > date_seven) ) {
    errors.push('Data inválida')
  } 

  return errors
}

const checkErrors = (cep, data) => {
  // validar CEP e data
  const errors = []
  if (!cep || cep.length != 8) {
    errors.push('CEP inválido')
  }

  validateDate(data, errors)
  return errors
}


class Handler {
  async HandlerGetForecast (req, res) {
    let { cep, data } = req.body;

    cep = cep.replace(/\D/g, '')

    const errors = checkErrors(cep, data)
    if (errors.length > 0) {
      return res.status(400).json(HttpResponse.badRequest(errors.join(' e ')))
    }

    //Buscar cep
    const {localidade, uf}  = await ViaCep.getCep(cep)
    if (!localidade || !uf) {
      return res.status(400).json(HttpResponse.badRequest('CEP não encontrado.'))
    }

    //Buscar Localidade
    const id = await ClimaTempo.getIdByName(localidade, uf)
    if (!id) {
      return res.status(400).json(HttpResponse.badRequest('Cidade não encontrada.'))
    }

    //Setar Cidade
    if (process.env.TOKEN_CITY) { 
      const updateCity = await ClimaTempo.setCity(id)
    }

    //Buscar Clima
    const forecast = await ClimaTempo.getForecast(id, data)
    if (!forecast) {
      return res.status(400).json(HttpResponse.badRequest('Clima não encontrado.'))
    }

    const mongoForecast = setMongoForecast(forecast)

    //Verificar se já existe
    const exists = await PostController.getMongoForecast(mongoForecast)
    let httpResponse = {}
    if (exists.statusCode == 200) {
      //Atualizar
      httpResponse = await PostController.updateForecast(exists.data._id, {$set: mongoForecast})
    } else {
      //Criar
      httpResponse = await PostController.createForecast(mongoForecast)
    }
    
    res.status(httpResponse.statusCode).json(mongoForecast)
  }
}

module.exports = Handler
