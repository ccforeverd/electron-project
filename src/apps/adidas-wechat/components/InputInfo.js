import 'date-fns'
import React from 'react'
import { useTranslation } from 'react-i18next'
import DateFnsUtils from '@date-io/date-fns'
import { TextField, Button } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers'

import { useStyles } from '../libs/style'
import { checkId, checkPhone } from '../libs/utils'

// TODO: 本地存储
// TODO: 多个页面登录
export default function InputInfo (props) {
  const { t } = useTranslation()
  const style = useStyles()
  const [values, setValues] = React.useState(props.values || {})
  const [idInput, setIdInput] = React.useState({ helperText: '', error: false })
  const [phoneInput, setPhoneInput] = React.useState({ helperText: '', error: false })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event && event.target ? event.target.value : event })
  }

  const handleClick = () => {
    let validate = true
    if (!checkId(values.id)) {
      validate = false
      setIdInput({
        helperText: '请输入有效的身份证号码',
        error: true
      })
    }
    if (!checkPhone(values.phone)) {
      validate = false
      setPhoneInput({
        helperText: '请输入正确的号码',
        error: true
      })
    }
    if (validate) {
      props.onNext(values)
    }
  }

  return (
    <section className={style.input}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TextField
          className={style.inputL}
          value={values.id}
          onChange={handleChange('id')}
          label={t('input-id-label')}
          placeholder={t('input-id-holder')}
          {...idInput}
        />
        <TextField
          className={style.inputM}
          value={values.phone}
          onChange={handleChange('phone')}
          label={t('input-phone-label')}
          placeholder={t('input-phone-holder')}
          {...phoneInput}
        />
        <TextField
          className={style.inputS}
          value={values.size}
          onChange={handleChange('size')}
          label={t('input-size-label')}
          placeholder={t('input-size-holder')}
        />
        <TextField
          className={style.inputM}
          value={values.start}
          onChange={handleChange('start')}
          label={t('input-start-label')}
          placeholder={t('input-start-holder')}
        />
        {/* https://material-ui-pickers.dev/demo/timepicker */}
        <KeyboardTimePicker
          className={style.inputS}
          label={t('input-time-label')}
          placeholder={t('input-time-holder')}
          value={values.time}
          onChange={handleChange('time')}
          ampm={false}
          format='HH:mm:ss'
          openTo='hours'
          views={['hours', 'minutes', 'seconds']}
        />

        <Button className={style.button} onClick={props.onBack}>{t('step-back')}</Button>
        <Button className={style.button} variant='contained' color='primary' onClick={handleClick}>{t('input-save')}</Button>
      </MuiPickersUtilsProvider>
    </section>
  )
}
