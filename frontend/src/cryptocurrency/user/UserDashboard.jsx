import UserNavbar from './UserNavbar'
import UserSiderbar from './UserSidebar'
import UserMain from './UserMain'
import Deposit from './deposit/Deposit'
import Withdrawal from './withdrawal/Withdrawal'
import Referral from './Referral'
import Profit from './Profit'
import Invest from './Invest'
import Transactions from './Transactions'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'
import Support from '../components/Support'


const UserDashboard = () => {
  const [isMobileSidebar, setIsMobileSidebar] = useState(false);
  const [name, setName] = useState("dashboard");
  const [isSupport, setIsSupport] = useState(false);


  const renderMainContent = () => {

    switch (name) {
      case "deposit":
        return <Deposit />

      case "profit":
        return <Profit />

      case "invest":
        return <Invest />

      case "withdrawal":
        return <Withdrawal />

      case "dashboard":
        return <UserMain setName={setName} />
      
        case "transactions":
          return <Transactions />
      
        case "referral":
          return <Referral />

      default:
        return <UserMain />
    }
  }

  return (
    <div className='flex bg-black w-full min-h-screen text-gray-100 overflow-x-hidden relative'>

      <UserSiderbar isMobileSidebar={isMobileSidebar} setIsMobileSidebar={setIsMobileSidebar} name={name} setName={setName} />

      <div className='flex-1 flex flex-col min-w-0 w-full min-h-screen'>
        <UserNavbar isMobileSidebar={isMobileSidebar} setIsMobileSidebar={setIsMobileSidebar} />

        {/* message box */}
        {isSupport && <Support onCloseSupport={() => setIsSupport(false)} />}
        {/* support message icon */}
        <div onClick={() => setIsSupport(!isSupport)} className='fixed z-99 right-10 p-1 w-30 bg-blue-600 rounded-full flex justify-between items-center bottom-10'>
          <span className='font-semibold text-lg pl-1'>Chat</span>
          <div className='rounded-full'>
            <MessageCircle size={48} className='hover:scale-110 duration-300 transition-all' />
          </div>
          <div className='fixed w-4 h-4 bg-green-500 rounded-full bottom-10'></div>
        </div>
        {/* dynamic contents */}
        {renderMainContent()}
      </div>
    </div>
  )
}

export default UserDashboard;
