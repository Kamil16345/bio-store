import {Routes, Route} from 'react-router-dom'
import {Home} from './components/Home'
import {SignInUser} from './components/SignInUser'
import {Navbar} from './components/Navbar'
import {UserPanel} from './components/userPanel'
import { SignUpUser } from './components/SignUpUser'
import { NoMatch } from './components/NoMatch'
import {AuthProvider} from "./components/auth"
import {Logout} from "./components/Logout"

function App() {
  return (
    <AuthProvider>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='*' element={<NoMatch/>} />
        <Route path='authenticate' element={<SignInUser/>} />
        <Route path='userPanel/:email' element={<UserPanel/>} />
        <Route path='signUp' element={<SignUpUser/>} />
        <Route path='logout' element={<Logout/>} />
        
      </Routes>
    </AuthProvider>
  );
}

export default App;
