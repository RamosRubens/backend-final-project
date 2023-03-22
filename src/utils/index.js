const { pbkdf2Sync, timingSafeEqual } = require('crypto')

const wait = (time) =>
  new Promise(resolve =>
    setTimeout(resolve, time)
  )

const safeCompare = async (data, comparison) => timingSafeEqual(Buffer.from(data), Buffer.from(comparison))

module.exports = {
  wait,
  encrypt,
  safeCompare
}
