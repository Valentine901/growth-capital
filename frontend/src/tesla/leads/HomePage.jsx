import Navbar from "../../tesla/components/Navbar";
import Home1 from "../pages/homes/Home1";
import Home2 from "../pages/homes/Home2";
import Home3 from "../pages/homes/Home3";
import Footer from "../../tesla/components/Footer";
import { MessageCircleQuestion } from "lucide-react";

const HomePage = () => {
  return (
    <div className="w-full">
      <Navbar />
      <Home1 />
      <Home2 />
      <Home3 />
      <a href="/support" className="fixed top-165 right-5 text-blue-800">
        <MessageCircleQuestion className="hover:scale-110 transition-all duration-150" size={64} />
      </a>
      <Footer />
    </div>
  )
}

export default HomePage;