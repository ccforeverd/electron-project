
import format from 'date-fns/format'
// https://github.com/mc-zone/IDValidator
import IdValidator from 'id-validator'
// https://github.com/validatorjs/validator.js
import isMobilePhone from 'validator/lib/isMobilePhone'

// 补全默认值
// 不会修改传入 values 的值
export function fixValues (values = {}) {
  return {
    id: values.id || '',
    phone: values.phone || '',
    size: values.size || 'D',
    start: values.start || 'YEEZY北京',
    time: values.time || new Date(`${format(Date.now(), 'yyyy-MM-dd')} 17:00:00`)
  }
}

// 身份证校验
// 返回 true 或 false
export function checkId (value) {
  return (new IdValidator()).isValid(value)
}

// 手机号校验
// 返回 true 或 false
export function checkPhone (value) {
  return isMobilePhone(value, 'zh-CN')
}
