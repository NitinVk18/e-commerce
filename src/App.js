
import { Route, Link, Routes} from 'react-router-dom';
import Customer from './Customer';
import Admin from './Admin';
import Login from './Login';
import Home from './Home' ;
import Products from './Products';
import Cart from './Cart';
import Payment from './Payment';
import Bill from './Bill';
import Allbills from './AdminBills'

function App() {
  return (
    <>
    <Routes>
<Route exact path="/" element={<Home/>} />
    <Route  path="/admin" element={<Admin/>} />
    <Route  path="/customer" element={<Customer/>} />
    <Route  path="/login" element={<Login/>} />
    <Route  path="/product" element={<Products/>} />
    <Route  path="/viewcart" element={<Cart/>} />
    <Route  path="/payment" element={<Payment/>} />
    <Route  path="/bill" element={<Bill/>} />
    <Route  path="/allbills" element={<Allbills/>} />
</Routes>

    
    </>
  );
}

export default App;
