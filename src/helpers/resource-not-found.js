module.exports = class ResourceNotFound extends Error {
  constructor (paramName) {
    super(`ResourceNotFound: ${paramName}`)
    this.name = `ResourceNotFound: ${paramName}`
  }
}
