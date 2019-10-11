import React from 'react'
import format from 'date-fns/format'
import { useTranslation } from 'react-i18next'
import { Button, Dialog, DialogContent, DialogActions } from '@material-ui/core'
import { Statistic } from 'antd'

import { useStyles } from '../libs/style'
import { fixValues } from '../libs/utils'

import ImageTempCode from '../assets/QR.png'

const { Countdown } = Statistic

export default function WechatScan (props) {
  const [open, setOpen] = React.useState(false)
  const { t } = useTranslation()
  const style = useStyles()
  const { time } = fixValues(props.values)

  const handleClick = () => {
    setOpen(true)
    props.onCodeShow()
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <section>
      <Button className={style.button} onClick={props.onBack}>{t('step-back')}</Button>
      <Button className={style.button} variant='contained' color='primary' onClick={handleClick}>{t('scan-button')}</Button>
      <Button className={style.button} disabled>
        {
          time.getTime() > Date.now()
            ? <Countdown value={time.getTime()} format='HH:mm:ss:SSS' />
            : `已超时, 预设时间为 ${format(time, 'HH:mm:ss')}`
        }
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogContent dividers>
          <img className={style.code} src={ImageTempCode} alt='code' />
        </DialogContent>
        <DialogActions className={style.codeBottom}>使用微信扫描二维码</DialogActions>
      </Dialog>
    </section>
  )
}
