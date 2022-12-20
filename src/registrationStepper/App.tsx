import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { AddressForm } from './RegistrationSteps/AddressStep'
import { ConfirmForm } from './RegistrationSteps/ConfirmStep'
import { ProfileForm } from './RegistrationSteps/PersonStep'

interface RegistrationAppProps {}

type RegisterUserDto = {
  firstName: string
  lastName: string
  email: string
  password: string
  address: string
  city: string
  region: string
  postalCode: string
  phoneNumber: string
}

const steps = ['Profile', 'Address', 'Confirm']
export const registrationApp: React.FC<RegistrationAppProps> = () => {
  /* const [steps, setSteps] = useState([
    <ProfileForm />,
    <AddressForm />,
    <ConfirmForm />,
  ]) */
  const [formData, setFormData] = useState<RegisterUserDto>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    address: '',
    city: '',
    region: '',
    postalCode: '',
  })

  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState<{
    [k: number]: boolean
  }>({})

  const totalSteps = () => {
    return steps.length
  }

  function handleComponents() {
    switch (activeStep) {
      case 1:
        return <ProfileForm />
      case 2:
        return <AddressForm />
      case 3:
        return <ConfirmForm />
      default:
        return <ProfileForm />
    }
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1
    setActiveStep(newActiveStep)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStep = (step: number) => () => {
    setActiveStep(step)
  }

  const handleComplete = () => {
    const newCompleted = completed
    newCompleted[activeStep] = true
    setCompleted(newCompleted)
    handleNext()
  }

  const handleReset = () => {
    setActiveStep(0)
    setCompleted({})
  }

  return <Container>
    <FormControl>
        <TextField></TextField>
    </FormControl>
  </Container>
}
