import {Routes, Route} from 'react-router-dom'
import {Home} from './components/Home'
import {SignInUser} from './components/SignInUser'
import {Navbar} from './components/Navbar'
import {UserPanel} from './components/userPanel'
import { SignUpUser } from './components/SignUpUser'
import { NoMatch } from './components/NoMatch'

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='*' element={<NoMatch/>} />
        <Route path='authenticate' element={<SignInUser/>} />
        <Route path='userPanel/:email' element={<UserPanel/>} />
        <Route path='signUp' element={<SignUpUser/>} />
        
      </Routes>
    </>
  );
}

export default App;
