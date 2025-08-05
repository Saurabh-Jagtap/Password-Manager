import './App.css'
import Footer from './components/Footer'
import Manager from './components/Manager'
import Navbar from './components/Navbar'

function App() {


  return (
    <>
      <Navbar />
      <div className='md:min-h-[85vh] min-h-[87vh]'>
        <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App
