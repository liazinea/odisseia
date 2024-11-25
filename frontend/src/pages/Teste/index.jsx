import HeaderHome from "../../components/HeaderHome"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Button from "../../components/Button"

const Teste = () => {
  return (
    <>
    <Navbar/>
    <HeaderHome/>
    <Button 
      variant="primary"
      size="medium"
    >Teste</Button>
    <Footer/>
    </>
  )
}

export default Teste