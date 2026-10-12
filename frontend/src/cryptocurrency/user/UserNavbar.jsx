import React from 'react'
import { Menu } from 'lucide-react';
import { useInvestAuth } from '../context/AuthContext';



const UserNavbar = ({ isMobileSidebar, setIsMobileSidebar }) => {
  const { userData } = useInvestAuth();
  return (
    <div className='w-full h-16 bg-zinc-950 border-b border-amber-400/10 px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-opacity-80'>
      <div className='flex items-center gap-4'>
        <button 
          onClick={() => setIsMobileSidebar(!isMobileSidebar)}
          className='lg:hidden text-gray-400 hover:text-amber-400 transition-colors duration-200 focus:outline-none'
        >
          <Menu size={24} />
        </button>
        <h1 className='text-lg font-bold tracking-wide text-gray-100'>Dashboard Overview</h1>
      </div>
      
      <div className='flex items-center gap-3'>
        <div className='w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-xs font-bold text-amber-400'>
          {userData.first_name[0]}{userData.last_name[0]}
        </div>
      </div>
    </div>
  )
}

export default UserNavbar;
