const { sendSms, randomStr } = require('./utils')

/**
 * 测试腾讯云发信是否正常
 */
async function sendTest() {
  try {
    const validTime = 5
    const phone = '1768888888'
    const smsCode = randomStr(6)
    const period = validTime * 60 * 1000

    // 3. 发送短信
    await sendSms(phone, '1100000', [smsCode, validTime + ''])
  } catch (e) {
    console.log(e)
  }
}

sendTest()
