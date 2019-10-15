
import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    // background: theme.palette.background.default,
    background: '#303030',
    display: 'table'
  },
  main: {
    margin: theme.spacing(4)
  },
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1)
  },
  input: {
    width: theme.spacing(60)
  },
  inputL: {
    width: theme.spacing(60),
    marginBottom: theme.spacing(1)
  },
  inputM: {
    width: theme.spacing(34),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  inputS: {
    width: theme.spacing(24)
  },
  back: {
    marginRight: theme.spacing(1)
  },
  code: {
    display: 'block',
    width: theme.spacing(30)
  },
  codeBottom: {
    justifyContent: 'center'
  }
}))
