import {Routes, Route} from 'react-router-dom'
import {Home} from './components/homePage/Home'
import {SignInCustomer} from './components/SignInCustomer'
import {Navbar} from './components/Navbar'
import {CustomerPanel} from './components/CustomerPanel'
import { SignUpCustomer } from './components/SignUpCustomer'
import { NoMatch } from './components/NoMatch'
import {AuthProvider} from "./components/auth"
import {Logout} from "./components/Logout"
import { ShoppingCart } from './components/ShoppingCart'

function App() {
  return (
    <AuthProvider>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='*' element={<NoMatch/>} />
        <Route path='authenticate' element={<SignInCustomer/>} />
        <Route path='customerPanel/:userId' element={<CustomerPanel/>} />
        <Route path='signUp' element={<SignUpCustomer/>} />
        <Route path='shoppingCart' element={<ShoppingCart/>} />
        <Route path='logout' element={<Logout/>} />
        
      </Routes>
    </AuthProvider>
  );
}

export default App;
