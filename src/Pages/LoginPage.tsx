import react, { useState } from 'react'
import { Container, FormControl, Input, InputLabel } from '@mui/material'
import './../style/loginPage.css'
import { LoginFormComponent } from '../components/LoginComponent'
import { RegisterFormComponent } from '../components/RegisterComponent'
import './../style/AuthenticationForm.scss';
import { useAuth } from '../Routes/AuthContext'
import { UserCredentials } from '../@types/userCredentials'
import { Navigate, useNavigate } from 'react-router-dom'
import { registrationApp as RegisterApp } from './../registrationStepper/App';

interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = () => {
  const [email, setEmail] = react.useState('')
  const [password, setPassword] = react.useState('')
  const [form, setForm] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {login} = useAuth();

  const handleFormChange = () => {
    setForm(!form);
  }

  const onSubmit = (data : UserCredentials) => {
    login(data.email, data.password).then((data) => {
      setLoading(true);
      
    }).catch(() => {
      setLoading(false);
    });
  }
  return (
    <Container
      sx={{ background: 'white', paddingTop: '4rem', paddingBottom: '4rem' }}
      maxWidth="md"
    >
      {form ? (
        <LoginFormComponent
        />
      ) : (
        <RegisterApp/>
      )}
      <span className='center' onClick={handleFormChange}>{form ? <span> I have no account</span> : <span> Already registered</span>}</span>
    </Container>
  )
}
