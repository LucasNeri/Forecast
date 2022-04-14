module.exports = class UnsupportedParamError extends Error {
  constructor (paramName) {
    super(`Unsupported param: ${paramName}`)
    this.name = `Unsupported param: ${paramName}`
  }
}
