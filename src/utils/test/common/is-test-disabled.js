// disable non-mandatory tests by default
// tests are enable when user defines method in question
function isTestDisabled(dataStructure, method) {
  if (typeof new dataStructure()[method] === 'undefined') {
      return true;
  }

  return false;
}

export default `\n${isTestDisabled.toString()};\n`;
