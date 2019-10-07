
import React from 'react'
import { useTranslation } from 'react-i18next'
import { List, ListItem, ListItemIcon, ListItemText, Button } from '@material-ui/core'
// import ForwardIcon from '@material-ui/icons/Forward'
import ForwardOutlinedIcon from '@material-ui/icons/ForwardOutlined'
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded'

import { useStyles } from '../libs/style'

export default function NoteBeforeStart (props) {
  const { t } = useTranslation()
  const style = useStyles()
  const list = [...Array(7)].map((item, index) => t(`note-${index + 1}`))

  return (
    <section>
      <List dense aria-label='qrcode'>
        {
          list.map(item => {
            const isImportant = item[0] === '*'

            return (
              <ListItem key={item}>
                <ListItemIcon>
                  {isImportant
                    ? <StarBorderRoundedIcon />
                    : <ForwardOutlinedIcon />}
                </ListItemIcon>
                <ListItemText primary={t(item.replace(/^\*/, ''))} />
              </ListItem>
            )
          })
        }
        <ListItem>
          <Button className={style.button} variant='contained' color='primary' onClick={props.onNext}>{t('note-next')}</Button>
        </ListItem>
      </List>
    </section>
  )
}
