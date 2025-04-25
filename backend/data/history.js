const fs = require('fs')
const path = require('path')

const dataDir = path.resolve(__dirname, '../data-files')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir)
}

const filePath = path.join(dataDir, 'history.json')


if (!fs.existsSync(filePath) || fs.readFileSync(filePath, 'utf-8').trim() === '') {
  fs.writeFileSync(filePath, '[]', 'utf-8')
}

let history = []
try {
  history = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
} catch (err) {
  console.error('Error al leer history.json:', err)
  history = []
}

function getHistory() {
  return history
}

function addToHistory(item) {
  history.push(item)
  fs.writeFileSync(filePath, JSON.stringify(history, null, 2))
}

function clearHistory() {
  history = []
  fs.writeFileSync(filePath, '[]')
  return true
}

module.exports = {
  getHistory,
  addToHistory,
  clearHistory
}
