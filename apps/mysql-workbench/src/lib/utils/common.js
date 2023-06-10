export default class CommonUtils {
  /**
   * @param {number} length
   * @returns {string}
   */
  static randomString(length = 3) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length

    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
  }
}
