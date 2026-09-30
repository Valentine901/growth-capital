import Home2 from "../pages/homes/Home2";
import Home3 from "../pages/homes/Home3";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"
import Vehicle1 from "../pages/vehicles/Vehicle1";

const Vehicles = () => {
  return (
    <div>
      <Navbar />
      <Vehicle1 />
      <Home2 />
      <Home3 />
      <Footer />
    </div>
  )
}

export default Vehicles;