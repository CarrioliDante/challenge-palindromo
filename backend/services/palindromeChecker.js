function isPalindrome(text) {
    const clean = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // elimina tildes
      .replace(/[^a-z0-9]/g, '') // elimina todo menos letras y num
  
    return clean === clean.split('').reverse().join('')
  }
  
  module.exports = { isPalindrome }
  