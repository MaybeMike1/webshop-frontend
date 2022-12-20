import {
  Alert,
  Button,
  Container,
  Divider,
  FormControl,
  Input,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginInterface } from '../@interface/LoginInterface'
import { UserCredentials } from '../@types/userCredentials'
import './../style/AuthenticationForm.scss'
import { userServices } from '../Services/UserService'
import { useAuth } from '../Routes/AuthContext'
import { Navigate, redirect } from 'react-router-dom'

export const LoginFormComponent: React.FC<LoginInterface> = () => {
  const [userCredentials, setUserCredentials] = React.useState<UserCredentials>(
    {
      email: '',
      password: '',
    },
  )
  const [error, setError] = React.useState<string | null>(null)

  const [message, setMessage] = React.useState<string | null>(null)

  const [loading, setLoading] = React.useState<boolean>(false)

  const { login } = useAuth()

  const { register, handleSubmit, watch } = useForm()

  const onSubmit = async (data: any) => {
    setLoading(true)
    setUserCredentials(data)
    await login(data.email, data.password)
      .then((data) => {
        if (!data) {
          setError('Invalid credentials')
          setLoading(false)
        }
        setError(null)
        setMessage('Logged in successfully')
      })
      .catch((error) => {
        setError(error.toString())
        setLoading(false)
      })
  }

  return (
    <Container sx={{ display: 'flex' }} className="authForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ width: '100%' }} spacing={2}>
          {error ? <Alert severity="warning">{error}</Alert> : null}
          {message ? <Alert severity="success">{message}</Alert> : null }
        </Stack>

        <Typography variant="h5" fontWeight={'785'} textTransform={'uppercase'}>
          Login
        </Typography>
        <>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input id="email" type="email" fullWidth {...register('email')} />
        </>
        <>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            fullWidth
            {...register('password')}
          />
        </>
        <Button type="submit" disabled={loading}>
          Log in
        </Button>
      </form>
    </Container>
  )
}
