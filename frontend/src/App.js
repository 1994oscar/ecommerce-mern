import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'

/**
 * Every component need to be import of the libary where is located.
 * py = Padding top and bottom in the Y axes
 * Container = Is the container class of Boostrap, in this proyect we use
 * React Bootstrap and Boostwacth for the theme template, the template name is Lux. 
 * React Bootstrap contain all the structure class, and the Lux them contain only
 * the css style.  
 */

function App() {
  return (
    <>
    <Header/>
      <main className='py-3'>
        <Container>
          <h1>Welcome To Proshop</h1>
        </Container>
      </main>
    <Footer/>
    </>
  );
}

export default App;
