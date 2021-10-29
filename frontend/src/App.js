import React                            from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Container}                      from 'react-bootstrap'
import Header                           from './components/Header'
import Footer                           from './components/Footer'
import HomeScreen                       from './screens/HomeScreen'
import ProductScreen                    from './screens/ProductScreen'
import CartScreen                       from './screens/checkout/CartScreen'
import LoginScreen                      from './screens/user/LoginScreen'
import UserListScreen                   from './screens/user/UserListScreen'
import RegisterScreen                   from './screens/user/RegisterScreen'
import ProfileScreen                    from './screens/user/ProfileScreen'
import ShippingScreen                   from './screens/checkout/ShippingScreen'
import PaymentScreen                    from './screens/checkout/PaymentScreen'
import PlaceOrderScreen                 from './screens/checkout/PlaceOrderScreen'
import OrderScreen                      from './screens/checkout/OrderScreen'


const App = () => {
  return (
    <Router basename="/">
      <Header/>
      <main className='py-3'>
        <Container>
          <Route path='/'             component={HomeScreen} exact />
          <Route path='/login'        component={LoginScreen} />
          <Route path='/register'     component={RegisterScreen} />
          <Route path='/profile'      component={ProfileScreen} />
          <Route path='/users'        component={UserListScreen} />
          <Route path='/product/:id'  component={ProductScreen} />
          <Route path='/cart/:id?'    component={CartScreen} />
          <Route path='/shipping'     component={ShippingScreen} />
          <Route path='/payment'      component={PaymentScreen} />
          <Route path='/placeorder'   component={PlaceOrderScreen} />
          <Route path='/order/:id'    component={OrderScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App;