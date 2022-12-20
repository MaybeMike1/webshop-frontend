import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import './App.css'
import NavigationBar from './components/NavigationBar'
import Navigation from './Routes/Navigation'
import theme from './utility/ThemeProvider'
import './style/variables.css'
import './style/resetcss.css'
import Footer from './components/FooterComponent'
import { AuthProvider } from './Routes/AuthContext'

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <div className="App">
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Navigation />
          <Footer />
        </ThemeProvider>
      </AuthProvider>
    </div>
  )
}

export default App
