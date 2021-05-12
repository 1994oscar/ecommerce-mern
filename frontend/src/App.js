import React                            from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Container}                      from 'react-bootstrap'
import Header                           from './components/Header'
import Footer                           from './components/Footer'
import HomeScreen                       from './screens/HomeScreen'
import ProductScreen                    from './screens/ProductScreen'
import CartScreen                       from './screens/CartScreen'
import LoginScreen                      from './screens/LoginScreen'
import RegisterScreen                   from './screens/RegisterScreen'
import ProfileScreen                   from './screens/ProfileScreen'

/**
 * App = Contain the principal structure of the aplication, all the component
 * are build in a individual files, then every component is import in the App.js files,
 * to render all the website. 
 * 
 * Every component need to be import of the libary where is located.
 * py = Padding top and bottom in the Y axes
 * Container = Is the container class of Boostrap, in this proyect we use
 * React Bootstrap and Boostwacth for the theme template, the template name is Lux. 
 * React Bootstrap contain all the structure class, and the Lux them contain only
 * the css style.
 * 
 * Header = The Header component that is created in the Header.js files
 * Footer = The Footer component that is created in the Footer.js files
 * 
 * React-Router: We need to implement React Router Globally, to use in our app.
 * 
 * Normally when we no use React Router we put the name of the component that we need to show, 
 * like <HomeScreen />, with react router we can put the router of this component. 
 * 
 * <Route path = '/' component={HomeScreen} exact />
 * 
 * We can use how many <Route /> component web need.
 * 
 * path='/product/:id', :id is the ID of the product, that we pass in the Link in <Product /> component, 
 * here in the App.js file, we create the Route to Link the products dinamically
 * 
 */

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
          <Route path='/product/:id'  component={ProductScreen} />
          <Route path='/cart/:id?'    component={CartScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App;