const express = require('express')
const router = express.Router()
const { isPalindrome } = require('../services/palindromeChecker')
const { getHistory, addToHistory, clearHistory } = require('../data/history')
const validateText = require('../middleware/validateText')

router.post('/palindrome', validateText, (req, res) => {
  const { text } = req.body

  if (!text || typeof text !== 'string' || text.trim().length < 3) {
    return res.status(400).json({ error: 'Texto inválido' })
  }

  const result = isPalindrome(text)
  addToHistory({ text, result })
  return res.json({ result })
})

router.get('/history', (_req, res) => {
  return res.json(getHistory())
})

router.delete('/history', (_req, res) => {
  const cleared = clearHistory()
  res.json({ message: 'Historial eliminado', cleared })
})

module.exports = router
