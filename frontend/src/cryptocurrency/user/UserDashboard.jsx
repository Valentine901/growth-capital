import UserNavbar from './UserNavbar'
import UserSiderbar from './UserSidebar'
import UserMain from './UserMain'
import Deposit from './Deposit'
import Withdrawal from './Withdrawal'
import Referral from './Referral'
import Profit from './Profit'
import Invest from './Invest'

import { useState } from 'react'


const UserDashboard = () => {
  const [isMobileSidebar, setIsMobileSidebar] = useState(false);
  const [name, setName] = useState("dashboard");


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
        return <UserMain />
      
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

        {/* dynamic contents */}
        {renderMainContent()}
      </div>
    </div>
  )
}

export default UserDashboard;
