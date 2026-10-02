import { Car } from "lucide-react";
import { Menu } from "lucide-react";
import { useState } from "react";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='fixed z-999 flex w-full h-18 items-center px-3 justify-between bg-gray-100/70 shadow-sm text-gray-600'>
      <a href="/" className="flex gap-3 items-center ">
        <Car size={28} className="text-blue-800" />
        <span className='text-black text-[23px] font-bold uppercase hover:text-blue-800 transition-all duration-300'>Tesla NEURALINK</span>
      </a>

      {/* medium and large screen size */}
      <div className='hidden lg:flex space-x-5 text-md  text-gray-600/90  mr-2 items-center'>
        <a className="hover:text-blue-800 transition-all duration-300" href="/vehicles">Vehicles</a>
        <a className="hover:text-blue-800 transition-all duration-300" href="/configurator">Configurator</a>
        <a className="hover:text-blue-800 transition-all duration-300" href="/test-drive">Test Drive</a>
        <a className="hover:text-blue-800 transition-all duration-300" href="/investment">Invest</a>
        <a className="hover:text-blue-800 transition-all duration-300" href="/support">Support</a>
        <a className="hover:text-blue-800 transition-all duration-300" href="/contact">Contact</a>
        <a className="hover:text-gray-100 hover:bg-gray-800 py-3 px-6 rounded-xl border border-gray-800 transition-all duration-300 font-semibold text-gray-800" href="/account">Account</a>
      </div>


      {/* smaller screen */}
      {isOpen && <div className='absolute top-18 left-0 flex flex-col lg:hidden space-x-5 text-md  text-gray-600/90 w-full gap-6 bg-white py-4 px-12 transition-all duration-500 shadow-xs'>
        <a className="hover:text-blue-800 transition-all duration-300" href="/vehicles">Vehicles</a>
        <a className="hover:text-blue-800 transition-all duration-300" href="/configurator">Configurator</a>
        <a className="hover:text-blue-800 transition-all duration-300" href="/compare">Compare</a>
        <a className="hover:text-blue-800 transition-all duration-300" href="/test-drive">Test Drive</a>
        <a className="hover:text-blue-800 transition-all duration-300" href="/investment">Invest</a>
        <a className="hover:text-blue-800 transition-all duration-300" href="/support">Support</a>
        <a className="hover:text-blue-800 transition-all duration-300" href="/contact">Contact</a>
        <a className="text-gray-100 hover:bg-blue-800/90 py-3 px-6 rounded-xl border border-blue-800 transition-all duration-300 font-semibold bg-blue-800" href="/account">Account</a>
      </div>}

      <button onClick={() => setIsOpen(!isOpen)} className="flex lg:hidden text-black hover:text-blue-800 duration-300 transition-all">
        <Menu size={30} />
      </button>
    </nav>
  )
}

export default Navbar;