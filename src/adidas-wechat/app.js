import React from 'react'
// import {  } from 'mobx-react'
import i18n from 'i18next'
import format from 'date-fns/format'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import green from '@material-ui/core/colors/green'
import { ThemeProvider } from '@material-ui/styles'

import InputInfo from './components/InputInfo'
import NoteBeforeStart from './components/NoteBeforeStart'
import WechatScan from './components/WechatScan'

import './style/base.scss'

const darkTheme = createMuiTheme({
  palette: {
    primary: green,
    type: 'dark'
  }
})

const store = {
  info: {}
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    background: theme.palette.background.default,
    display: 'table'
  },
  box: {
    margin: theme.spacing(4)
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}))

function getSteps () {
  return [...Array(6)].map((item, index) => i18n.t(`step-${index + 1}`))
}

function getStepContent (step, setActiveStep) {
  const handleInputNext = values => () => {
    store.info.id = values.id
    store.info.phone = values.phone
    store.info.size = values.size || 'D'
    store.info.start = values.start || 'YEEZY北京'
    store.info.time = values.time || new Date(`${format(Date.now(), 'yyyy-MM-dd')} 10:00:00`)
    console.log(store)
    setActiveStep(2)
  }

  switch (step) {
    case 0:
      return (
        <NoteBeforeStart onNext={() => setActiveStep(1)} />
      )
    case 1:
      return (
        <InputInfo onNext={handleInputNext} />
      )
    case 2:
      return (
        <WechatScan onNext={() => setActiveStep(3)} />
      )
    default:
      return 'Unknown step'
  }
}

export default function VerticalLinearStepper () {
  const style = useStyles()
  const [activeStep, setActiveStep] = React.useState(1)
  const steps = getSteps()

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1)
  // }

  // const handleBack = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep - 1)
  // }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <ThemeProvider theme={darkTheme} className={style.root}>
      <Stepper className={style.box} activeStep={activeStep} orientation='vertical'>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{i18n.t(label)}</StepLabel>
            <StepContent>
              {getStepContent(index, setActiveStep)}
              {/* <Typography></Typography> */}
              {/* <div className={style.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={style.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleNext}
                    className={style.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div> */}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={style.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={style.button}>
            Reset
          </Button>
        </Paper>
      )}
    </ThemeProvider>
  )
}
