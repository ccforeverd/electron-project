
import React from 'react'
import i18n from 'i18next'
// import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.spacing(60)
  },
  id: {
    width: theme.spacing(60),
    marginBottom: theme.spacing(1)
  },
  phone: {
    width: theme.spacing(40),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(4)
  },
  size: {
    width: theme.spacing(18)
  }
}))

export default function InputInfo (props) {
  console.log(props)

  // const { t } = useTranslation()
  const style = useStyles()
  const [values, setValues] = React.useState({
    id: '',
    phone: '',
    size: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  return (
    <section className={style.root}>
      <TextField
        className={style.id}
        value={values.id}
        onChange={handleChange('id')}
        label={i18n.t('身份证')}
        placeholder={i18n.t('请输入18位身份证信息')}
      />
      <TextField
        className={style.phone}
        value={values.phone}
        onChange={handleChange('phone')}
        label={i18n.t('手机号')}
        placeholder={i18n.t('请输入11位手机号码')}
      />
      <TextField
        className={style.size}
        value={values.size}
        onChange={handleChange('size')}
        label={i18n.t('尺码')}
        placeholder={i18n.t('选填, 默认D')}
      />
      <Button variant='contained' color='primary' onClick={props.onNext}>{i18n.t('保存信息')}</Button>
    </section>
  )
}
