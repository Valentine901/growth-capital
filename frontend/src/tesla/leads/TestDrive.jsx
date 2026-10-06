import Navbar from "../components/Navbar";
import Test_drive from "../pages/test-drive/Test_drive";
import Footer from "../components/Footer";
import { MessageCircleQuestion } from "lucide-react";

const TestDrive = () => {
  return (
    <div>
      <Navbar />
      <Test_drive />
      <a href="/support" className="fixed top-165 right-5 text-blue-800">
        <MessageCircleQuestion className="hover:scale-110 transition-all duration-150" size={64} />
      </a>
      <Footer />
    </div>
  )
}

export default TestDrive;