const tcb = require('@cloudbase/node-sdk')
const { RETURN_STATUS } = require('./contants')
const { loginWithCode, verifySmsCode, sendSmsCode } = require('./sms')
const { privateKey, collectionName } = require('./config')

const app = tcb.init({
  env: tcb.SYMBOL_CURRENT_ENV,
  credentials: { ...privateKey }
})

exports.main = async (event, context) => {
  try {
    return await main(event, context)
  } catch (error) {
    console.log(error)
    return {
      code: error.code || RETURN_STATUS[0].code,
      msg: error.message || RETURN_STATUS[0].msg
    }
  }
}

async function main(event, content) {
  const LOGIN = 'LOGIN'
  const SEND = 'SEND'
  const VERIFY = 'VERIFY'

  const db = app.database()
  const collection = db.collection(collectionName)
  const _ = db.command

  const { cmd, phone, smsCode, Message } = event

  if (cmd === SEND) {
    await sendSmsCode(phone, collection)
    return RETURN_STATUS[10001]
  } else if (cmd === LOGIN) {
    const verified = await verifySmsCode(phone, smsCode, collection, _)
    if (verified) {
      const ticket = await loginWithCode(phone, app)
      return {
        ...RETURN_STATUS[10002],
        ticket: ticket
      }
    } else {
      return RETURN_STATUS[20001]
    }
  } else if (cmd === VERIFY) {
    const verified = await verifySmsCode(phone, smsCode, collection, _)
    return verified ? RETURN_STATUS[10003] : RETURN_STATUS[20002]
  }
}
