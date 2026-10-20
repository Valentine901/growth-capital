import AdminNavbar from './AdminNavbar'
import AdminSidebar from './AdminSidebar'
import AdminMain from './AdminMain'
import Investors from './Investors'
import Plans from './Plans'
import CreatePlan from './CreatePlan'
import AdminSupport from "./AdminSupport";
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'


const AdminDashboard = () => {
  const [isMobileSidebar, setIsMobileSidebar] = useState(false);
  const [name, setName] = useState("dashboard");
  const [isSupport, setIsSupport] = useState(false);

  const renderMainContent = () => {

    switch (name) {
      case "investors":
        return <Investors />

      case "plans":
        return <Plans />

      case "dashboard":
        return <AdminMain />

      case "createPlan":
        return <CreatePlan />

      default:
        return <AdminMain />
    }
  }

  return (
    <div className='flex bg-black w-full min-h-screen text-gray-100 overflow-x-hidden relative'>

      <AdminSidebar isMobileSidebar={isMobileSidebar} setIsMobileSidebar={setIsMobileSidebar} name={name} setName={setName} />

      <div className='flex-1 flex flex-col min-w-0 w-full min-h-screen'>
        <AdminNavbar isMobileSidebar={isMobileSidebar} setIsMobileSidebar={setIsMobileSidebar} />


        {/* message box */}
        {isSupport && <AdminSupport onCloseSupport={() => setIsSupport(false)} />}
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

export default AdminDashboard;
