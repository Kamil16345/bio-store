import {Routes, Route} from 'react-router-dom'
import {Home} from './components/Home'
import {AuthenticateUser} from './components/authenticate-user.component'
import {Navbar} from './components/Navbar'
import {UserPanel} from './components/user-panel'
import { SignUpUser } from './components/SignUpUser'

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='authenticate' element={<AuthenticateUser/>} />
        <Route path='user-panel' element={<UserPanel/>} />
        <Route path='signUp' element={<SignUpUser/>} />
        
      </Routes>
    </>
  );
}

export default App;
