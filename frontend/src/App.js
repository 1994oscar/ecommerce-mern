import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'

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
 */

function App() {
  return (
    <>
    <Header/>
      <main className='py-3'>
        <Container>
          <HomeScreen />
        </Container>
      </main>
    <Footer/>
    </>
  );
}

export default App;
