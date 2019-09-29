
import 'date-fns'
import React from 'react'
import i18n from 'i18next'
import DateFnsUtils from '@date-io/date-fns'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers'

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.spacing(60)
  },
  id: {
    width: theme.spacing(60),
    marginBottom: theme.spacing(1)
  },
  phone: {
    width: theme.spacing(34),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  size: {
    width: theme.spacing(24)
  },
  start: {
    width: theme.spacing(34),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  time: {
    width: theme.spacing(24)
  }
}))

export default function InputInfo (props) {
  const style = useStyles()
  const [values, setValues] = React.useState({
    id: '',
    phone: '',
    size: '',
    start: '',
    time: null
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event && event.target ? event.target.value : event })
  }

  return (
    <MuiPickersUtilsProvider className={style.root} utils={DateFnsUtils}>
      <TextField
        className={style.id}
        value={values.id}
        onChange={handleChange('id')}
        label={i18n.t('input-id-label')}
        placeholder={i18n.t('input-id-holder')}
      />
      <TextField
        className={style.phone}
        value={values.phone}
        onChange={handleChange('phone')}
        label={i18n.t('input-phone-label')}
        placeholder={i18n.t('input-phone-holder')}
      />
      <TextField
        className={style.size}
        value={values.size}
        onChange={handleChange('size')}
        label={i18n.t('input-size-label')}
        placeholder={i18n.t('input-size-holder')}
      />
      <TextField
        className={style.start}
        value={values.start}
        onChange={handleChange('start')}
        label={i18n.t('input-start-label')}
        placeholder={i18n.t('input-start-holder')}
      />
      {/* https://material-ui-pickers.dev/demo/timepicker */}
      <KeyboardTimePicker
        className={style.time}
        label={i18n.t('input-time-label')}
        placeholder={i18n.t('input-time-holder')}
        value={values.time}
        onChange={handleChange('time')}
        ampm={false}
        format='HH:mm:ss'
        openTo='hours'
        views={['hours', 'minutes', 'seconds']}
      />
      <br />
      <Button variant='contained' color='primary' onClick={props.onNext(values)}>{i18n.t('保存信息')}</Button>
    </MuiPickersUtilsProvider>
  )
}
