// disable non-essential tests by default
// tests are enable when user defines method in question
const isTestDisabled = (dataStructure, method) => {
  if (typeof new dataStructure()[method] === 'undefined') {
      return true;
  }

  return false;
}

export default `\n${isTestDisabled.toString()};\n`;
