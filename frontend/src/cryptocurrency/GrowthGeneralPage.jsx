import CryptoNavbar from "./components/CryptoNavbar";
import Navbar from "./components/Navbar";
import HomePg from "./pages/HomePg";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Plans from "./pages/Plans";
import Assurance from "./pages/Assurance";
import Guide from "./pages/Guide";
import Testimonial from "./pages/Testimonial";
import OurTeam from "./pages/OurTeam";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import { MessageCircle } from "lucide-react";
import ScrollReveal from "./components/ScrollReveal";

const GrowthGeneralPage = () => {

    return (
        <div className='min-h-screen bg-black text-white'>
            <CryptoNavbar />

            <Navbar />

            {/* home */}
            <ScrollReveal>
                <HomePg />
            </ScrollReveal>

            {/* about */}
            <ScrollReveal>
                <About />
            </ScrollReveal>

            {/* portfolio */}
            <ScrollReveal>
                <Portfolio />
            </ScrollReveal>

            {/* plans */}
            <ScrollReveal>
                <Plans />
            </ScrollReveal>

            {/* Assurance */}
            <ScrollReveal>
                <Assurance />
            </ScrollReveal>

            {/* Guide */}
            <ScrollReveal>
                <Guide />
            </ScrollReveal>

            {/* Our Team */}
            <ScrollReveal>
                <OurTeam />
            </ScrollReveal>

            {/* Testimonial */}
            <ScrollReveal>
                <Testimonial />
            </ScrollReveal>

            {/* Contact */}
            <ScrollReveal>
                <Contact />
            </ScrollReveal>

            {/* Footer */}
            <Footer />

            <button className="fixed bottom-7 left-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-110 hover:bg-green-400">
                <MessageCircle size={28} />
            </button>
        </div>
    )
}

export default GrowthGeneralPage