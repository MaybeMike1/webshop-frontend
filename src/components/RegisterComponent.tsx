import React, { useState } from 'react'
import {
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from '@mui/material'
import './../style/AuthenticationForm.scss'
import { RegisterInterface } from '../@interface/RegisterInterface'
import { FormProvider, useForm } from 'react-hook-form'
import { userServices } from '../Services/UserService'
import { UserCredentials } from '../@types/userCredentials'

export const RegisterFormComponent: React.FC<RegisterInterface> = () => {
  const methods = useForm();
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleConfirmPassword = (password: string, confirmPassword: string) => {
    if (password === confirmPassword) {
      return false
    }
    return true
  }

  const onSubmit = async (data: any) => {
    const isValid = handleConfirmPassword(data.password, data.confirmPassword)

    const cat = {
      email: data.email,
      password: data.password,
      userName: data.username,
    }
    if (isValid) {
      return await userServices
        .register(cat)
        .then((data) => {
        })
        .catch((error) => {
        })
    }

    setError('Passwords do not match')
    return
  }

  return (
    <FormProvider {...methods}>
      <Container sx={{ display: 'flex' }} className="authForm">
        <form
          onChange={() => {
            setError('')
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography
            variant="h5"
            fontWeight={'785'}
            textTransform={'uppercase'}
          >
            Register
          </Typography>
          <Typography
            className="errors"
            sx={{ textAlign: 'center', color: 'red' }}
          ></Typography>

          <InputLabel htmlFor="email">Email</InputLabel>
          <Input id="email" type="email" fullWidth {...register('email')} />

          <InputLabel htmlFor="username">Username</InputLabel>
          <Input id="email" type="text" fullWidth {...register('username')} />

          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            fullWidth
            {...register('password')}
          />

          <InputLabel htmlFor="password">Confirm Password</InputLabel>
          <Input
            id="confirmPassword"
            type="password"
            fullWidth
            {...register('password')}
          />
          <Button type="submit">Register</Button>
        </form>
      </Container>
    </FormProvider>
  )
}
