const tencentcloud = require('tencentcloud-sdk-nodejs')
const { tcSecreet, smsParams } = require('./config')
const smsClient = tencentcloud.sms.v20210111.Client

const characters = []
for (let i = 0; i < 10; ++i) {
  characters.push(String.fromCharCode(48 + i))
}

/**
 * 生成 [min, max] 区间范围内的随机整数
 *
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
/**
 * 生成随机字符串
 *
 * @param {number} length
 * @return {string}
 */
function randomStr(length = 6) {
  const max = characters.length - 1
  let str = ''
  for (let i = 0; i < length; ++i) {
    str = str + characters[randomInt(0, max)]
  }
  return str
}

/**
 * 使用腾讯云 SDK 发送短信
 *
 * @param {string} phone 下发手机号
 * @param {string} templateId 模板 ID
 * @param {array} templateParamSet 模板参数
 */
async function sendSms(phone, templateId, templateParamSet) {
  const client = new smsClient({
    credential: {
      secretId: tcSecreet.secretId,
      secretKey: tcSecreet.SecretKey
    },
    region: 'ap-guangzhou',
    profile: {}
  })

  const params = {
    /* 短信应用ID: 短信SmsSdkAppId在 [短信控制台] 添加应用后生成的实际SmsSdkAppId，示例如1400006666 */
    SmsSdkAppId: smsParams.smsSdkAppId,
    /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名，签名信息可登录 [短信控制台] 查看 */
    SignName: smsParams.signName,
    /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
     * 示例如：+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
    PhoneNumberSet: [`+86${phone}`],
    /* 模板 ID: 必须填写已审核通过的模板 ID。模板ID可登录 [短信控制台] 查看 */
    TemplateId: templateId,
    /* 模板参数: 若无模板参数，则设置为空*/
    TemplateParamSet: templateParamSet
  }

  return client.SendSms(params).then(
    (data) => {
      console.log(data)
      if (data.SendStatusSet[0].Code !== 'Ok') {
        throw new Error(data.SendStatusSet[0].Code)
      }
      return data
    },
    (err) => {
      console.error('error', err)
      throw err
    }
  )
}

module.exports = {
  randomStr,
  sendSms
}
