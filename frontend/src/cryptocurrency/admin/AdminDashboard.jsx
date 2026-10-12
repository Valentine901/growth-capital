import AdminNavbar from './AdminNavbar'
import AdminSidebar from './AdminSidebar'
import AdminMain from './AdminMain'
import Investors from './Investors'
import Plans from './Plans'
import CreatePlan from './CreatePlan'
import { useState } from 'react'


const AdminDashboard = () => {
  const [isMobileSidebar, setIsMobileSidebar] = useState(false);
  const [name, setName] = useState("dashboard");


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

        {/* dynamic contents */}
        {renderMainContent()}
      </div>
    </div>
  )
}

export default AdminDashboard;
