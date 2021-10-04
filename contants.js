module.exports.RETURN_STATUS = {
  [0]: {
    code: 'UNKNOWN_ERROR',
    msg: '未知错误'
  },

  [10000]: {
    code: 'CLEAR_SUCCESS',
    msg: '清空过期验证码成功'
  },

  [10001]: {
    code: 'SEND_SUCCESS',
    msg: '短信验证码发送成功'
  },

  [10002]: {
    code: 'LOGIN_SUCCESS',
    msg: '成功获取登录ticket'
  },

  [10003]: {
    code: 'SMS_CODE_IS_VALID',
    msg: '验证码有效'
  },

  [20000]: {
    code: 'UNVALID_PARAM_CMD_ERROR',
    msg: '请检查 "cmd" / "Message" 参数是否有效'
  },

  [20001]: {
    code: 'VERITY_FAIL',
    msg: '验证码填写错误'
  },

  [20002]: {
    code: 'SMS_CODE_IS_UNVALID',
    msg: '验证码无效'
  }
}
