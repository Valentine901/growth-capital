import React from 'react';
import { LayoutDashboard, LogOut, X, ArrowUpFromLine, ArrowDownToLine, UserRoundPlus, Receipt, TrendingUp, LineChart } from "lucide-react";
import { useInvestAuth } from '../context/AuthContext';


const UserSidebar = ({ isMobileSidebar, setIsMobileSidebar, name, setName }) => {
const {handleFetchUserCompletedWithdrawals, handleFetchUserProfits, handleFetchUserWallet, handleFetchUserWithdrawals, handleFetchUserInvestments, logout} = useInvestAuth();


  const Items = [
    { name: "dashboard", icon: <LayoutDashboard />, click: ()=>{handleFetchUserCompletedWithdrawals(); handleFetchUserProfits(); handleFetchUserWallet(); handleFetchUserWithdrawals(); handleFetchUserInvestments() } },
    { name: "profit", icon: <LineChart />, click: ()=>{handleFetchUserProfits() } },
    { name: "invest", icon: <TrendingUp />, click: ()=>{handleFetchUserInvestments()} },
    { name: "withdrawal", icon: <ArrowUpFromLine /> },
    { name: "deposit", icon: <ArrowDownToLine /> },
    { name: "transactions", icon: <Receipt /> },
    { name: "referral", icon: <UserRoundPlus /> },

  ]

  return (
    <>
      <div className='hidden lg:flex flex-col max-w-xs w-full bg-black border-r border-amber-300/30 min-h-screen relative'>
        <div className="bg-amber-400 text-black w-20 h-20 cursor-pointer flex items-center justify-center rounded-2xl shadow-xl shadow-amber-400/10 mx-auto my-5">
          <h1 className="text-6xl font-black tracking-tighter">G</h1>
        </div>

        <div className="flex-1 mt-5 p-3 space-y-3">

          {Items.map((item) => {
            const isName = name === item.name;

            return (
              <div key={item.name}
                onClick={() => {setName(item.name); item.click()}}
                className={`flex gap-4 p-3 border border-amber-300/20 ${isName ? "border-amber-300/50 text-amber-300/80" : null} rounded-lg hover:text-amber-300/80 hover:border-amber-300/50 transition-all duration-300`}>
                {item.icon}
                <span>{item.name}</span>
              </div>
            )
          })}

        </div>

        <div onClick={() => logout()} className='flex items-center justify-center bg-red-500 gap-2 py-3 px-12 rounded-lg text-white font-semibold cursor-pointer hover:bg-red-600 transition-colors mb-2'>
          <LogOut size={20} />
          <button>Logout</button>
        </div>
      </div>


      <div
        onClick={() => setIsMobileSidebar(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[998] lg:hidden transition-opacity duration-300 ease-in-out ${isMobileSidebar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      />

{/* mobile side bar section */}
      <div className={`fixed inset-y-0 left-0 max-w-50 w-full bg-black border-r border-amber-300/30 h-full py-6 px-2 shadow-2xl z-[999] lg:hidden flex flex-col transform transition-transform duration-300 ease-in-out ${isMobileSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}>


        <div className="flex items-center justify-between mt-2">
          <div className="bg-amber-400 text-black w-14 h-14 cursor-pointer flex items-center justify-center rounded-xl shadow-lg shadow-amber-400/10">
            <h1 className="text-4xl font-black tracking-tighter">G</h1>
          </div>

          {/* Internal Close Trigger */}
          <button
            onClick={() => setIsMobileSidebar(false)}
            className="p-2 rounded-lg bg-zinc-900 border border-amber-300/20 text-gray-400 hover:text-amber-400 transition-colors focus:outline-none"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 mt-5 p-3 space-y-3">

          {Items.map((item) => {
            return (
              <div key={item.name}
                onClick={() => {  
                  setName(item.name);
                  setIsMobileSidebar(false);
                }}
                className={`flex gap-4 p-3 border border-amber-300/20 rounded-lg hover:text-amber-300/80 hover:border-amber-300/50 transition-all duration-300`}>
                {item.icon}
                <span>{item.name}</span>
              </div>
            )
          })}

        </div>


        <div onClick={() => logout()} className='flex items-center justify-center bg-red-500 gap-2 py-3 px-12 rounded-lg text-white font-semibold cursor-pointer hover:bg-red-600 transition-colors mb-2'>
          <LogOut size={20} />
          <button>Logout</button>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
