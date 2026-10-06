import Home2 from "../pages/homes/Home2";
import Home3 from "../pages/homes/Home3";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"
import Vehicle1 from "../pages/vehicles/Vehicle1";
import { MessageCircleQuestion } from "lucide-react";

const Vehicles = () => {
  return (
    <div>
      <Navbar />
      <Vehicle1 />
      <Home2 />
      <Home3 />
      <a href="/support" className="fixed top-165 right-5 text-blue-800">
        <MessageCircleQuestion className="hover:scale-110 transition-all duration-150" size={64} />
      </a>
      <Footer />
    </div>
  )
}

export default Vehicles;