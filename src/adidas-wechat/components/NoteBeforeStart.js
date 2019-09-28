
import React from 'react'
import i18n from 'i18next'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
// import ForwardIcon from '@material-ui/icons/Forward'
import ForwardOutlinedIcon from '@material-ui/icons/ForwardOutlined'
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded'

function getList () {
  return [...Array(7)].map((item, index) => i18n.t(`note-${index + 1}`))
}

function getListItem (item) {
  const isImportant = item[0] === '*'

  return (
    <ListItem key={item}>
      <ListItemIcon>
        {isImportant
          ? <StarBorderRoundedIcon />
          : <ForwardOutlinedIcon />}
      </ListItemIcon>
      <ListItemText primary={i18n.t(item.replace(/^\*/, ''))} />
    </ListItem>
  )
}

export default function NoteBeforeStart (props) {
  const list = getList()

  return (
    <section>
      <List dense aria-label='qrcode'>
        {
          list.map(getListItem)
        }
        <ListItem>
          <Button variant='contained' color='primary' onClick={props.onNext}>{i18n.t('note-next')}</Button>
        </ListItem>
      </List>
    </section>
  )
}
