import React from 'react'
// import { useLocalStore, useObserver } from 'mobx-react'
import i18n from 'i18next'
import { Wechaty } from 'wechaty'
import { Stepper, Step, StepLabel, StepContent, Button, Paper, Typography } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import { ThemeProvider } from '@material-ui/styles'

import { useStyles } from './libs/style'
import { InputInfo, NoteBeforeStart, WechatScan } from './components'

import './css/base.scss'

const bot = new Wechaty({
  name: 'gotem-wechat-bot',
  puppet: 'wechaty-puppet-wechat4u',
  // ...
  puppetOptions: {
    // endpoint: '<executablePath>'
  }
})
bot.on('scan', (qrcode, status) => console.log(status, ['https://api.qrserver.com/v1/create-qr-code/?data=', encodeURIComponent(qrcode), '&size=220x220&margin=20'].join('')))
bot.on('login', user => console.log(`User ${user} logined`))
bot.on('message', message => console.log(`Message: ${message}`))
bot.start()

const darkTheme = createMuiTheme({
  palette: {
    primary: green,
    type: 'dark'
  }
})

function getSteps () {
  return [...Array(6)].map((item, index) => i18n.t(`step-${index + 1}`))
}

export default function App () {
  const [activeStep, setActiveStep] = React.useState(2)
  const [values, setValues] = React.useState({
    id: '130604199001011210',
    phone: '18811111111',
    size: '',
    start: '',
    time: null
  })
  const style = useStyles()
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleInputNext = values => {
    setValues(values)
    // store.updateInfo(values)
    handleNext()
  }

  const handleCodeShow = () => {
    bot.start()
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <section className={style.root}>
        <Stepper className={style.main} activeStep={activeStep} orientation='vertical'>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{i18n.t(label)}</StepLabel>
              <StepContent>
                {index === 0 && (
                  <NoteBeforeStart onNext={handleNext} />
                )}
                {index === 1 && (
                  <InputInfo
                    values={values}
                    onBack={handleBack}
                    onNext={handleInputNext}
                  />
                )}
                {index === 2 && (
                  <WechatScan
                    values={values}
                    onBack={handleBack}
                    onCodeShow={handleCodeShow}
                  />
                )}
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
      </section>
    </ThemeProvider>
  )
}

// class App extends Component {
//   render () {
//     return (
//       <ThemeProvider theme={darkTheme}>
//         <h1>123</h1>
//       </ThemeProvider>
//     )
//   }
// }

// export default App
