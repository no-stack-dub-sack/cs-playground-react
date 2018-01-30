// disable non-mandatory tests by default
// tests are enable when user defines method in question
module.exports = function(dataStructure, method) {
  if (typeof new dataStructure()[method] === 'undefined') {
      return true
  }

  return false
}
