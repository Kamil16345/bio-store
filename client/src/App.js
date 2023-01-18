import {Routes, Route} from 'react-router-dom'
import {Home} from './components/homePage/Home'
import {SignInCustomer} from './components/SignInCustomer/SignInCustomer'
import {Navbar} from './components/Navbar/Navbar'
import {CustomerPanel} from './components/CustomerPanel/CustomerPanel'
import { SignUpCustomer } from './components/SignUpCustomer/SignUpCustomer'
import { NoMatch } from './components/NoMatch/NoMatch'
import {AuthProvider} from "./components/AuthenticateAdmin/AuthenticateAdmin"
import {Logout} from "./components/Logout/Logout"
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart'

function App() {
  return (
    <AuthProvider>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='*' element={<NoMatch/>} />
        <Route path='authenticate' element={<SignInCustomer/>} />
        <Route path='customerPanel/:customerId' element={<CustomerPanel/>} />
        <Route path='signUp' element={<SignUpCustomer/>} />
        <Route path='shoppingCart' element={<ShoppingCart/>} />
        <Route path='logout' element={<Logout/>} />
        
      </Routes>
    </AuthProvider>
  );
}

export default App;
