import { Routes, Route } from "react-router-dom"
import TeslaGeneralPage from "./tesla/TeslaGeneralPage";
import GrowthGeneralPage from "./cryptocurrency/GrowthGeneralPage";


const App = () => {
  return (
    <Routes>
      {/* visitors page routes */}
        <Route path="/" element={<TeslaGeneralPage />}  />
        <Route path="/investment" element={<GrowthGeneralPage />} />

    

      {/* User dashboard routes (Nested approach for a clean dashboard URL structure) */}
      {/* 
      <Route path="/user-dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<UserProfile />} />
      </Route> 
      */}
    </Routes>
  )
}

export default App