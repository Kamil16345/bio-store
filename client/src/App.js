import {Routes, Route} from 'react-router-dom'
import {Home} from './components/Home/Home'
import {SignInCustomer} from './components/SignInCustomer/SignInCustomer'
import {Navbar} from './components/Navbar/Navbar'
import {CustomerPanel} from './components/CustomerPanel/CustomerPanel'
import { SignUpCustomer } from './components/SignUpCustomer/SignUpCustomer'
import { NoMatch } from './components/NoMatch/NoMatch'
import {AuthProvider} from "./components/AuthenticateAdmin/AuthenticateAdmin"
import {Logout} from "./components/Logout/Logout"
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart'
import {Category} from './components/Category/Category'

function App() {
  return (
    <AuthProvider>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='*' element={<NoMatch/>} />
        <Route path='authCustomer' element={<SignInCustomer/>} />
        <Route path='customerPanel' element={<CustomerPanel/>} />
        <Route path='/:category' element={<Category />} />
        <Route path='signUp' element={<SignUpCustomer/>} />
        <Route path='shoppingCart' element={<ShoppingCart/>} />
        <Route path='logout' element={<Logout/>} />
        <Route path='authUser' element={<Home/>} />
        
      </Routes>
    </AuthProvider>
  );
}

export default App;
