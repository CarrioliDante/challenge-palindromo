const express = require('express')
const cors = require('cors')
const palindromeRoutes = require('./routes/palindrome.route')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.use('/', palindromeRoutes)

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`)
})

app.use((err, req, res, next) => {
  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    'body' in err
  ) {
    console.error('JSON malformado:', err.message)
    return res.status(400).json({ error: 'JSON malformado en el body' })
  }
  console.error('Error interno del servidor:', err.message)
  return res.status(500).json({ error: 'Error interno del servidor' })
})