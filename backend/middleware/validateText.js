function validateText(req, res, next) {
    const { text } = req.body
  
    if (!text || typeof text !== 'string' || text.trim().length < 3) {
      return res
        .status(400)
        .json({ error: 'Debe ingresar una palabra o frase válida (mínimo 3 caracteres)' })
    }
  
    next()
  }
  
  module.exports = validateText
  