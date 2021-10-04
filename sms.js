const { smsParams } = require('./config')
const { randomStr, sendSms } = require('./utils')

/**
 * 生成验证码并存储到云数据库，发送短信
 */
async function sendSmsCode(phone, collection) {
  const { validTime, codeTemplateId } = smsParams
  // 1. 移除之前的验证码
  // const res = await collection.where({ phone }).get()

  // if (res.data.length) {
  await collection.where({ phone }).remove()
  // }

  // 2. 生成验证码
  const smsCode = randomStr(6)
  const period = validTime * 60 * 1000
  const doc = {
    phone,
    smsCode,
    expiration: Date.now() + period
  }

  await collection.add(doc)

  // 3. 发送短信
  await sendSms(phone, codeTemplateId, [smsCode, validTime + ''])
}

/**
 * 签发ticket
 */
async function loginWithCode(phone, app) {
  return app.auth().createTicket(phone)
}

/**
 * 验证验证码是否和云数据库中一致
 */
async function verifySmsCode(phone, smsCode, collection, _) {
  const visitTime = Date.now()

  const res = await collection
    .where({
      phone,
      smsCode,
      expiration: _.gte(visitTime)
    })
    .get()

  const verified = !!res.data.length
  if (verified) {
    await collection.where({ phone }).remove()
  }
  return verified
}

module.exports = {
  loginWithCode,
  verifySmsCode,
  sendSmsCode
}
