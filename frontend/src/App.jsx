import { Routes, Route } from "react-router-dom"
import TeslaMainLayout from "./tesla/TeslaMainLayout";
import GrowthGeneralPage from "./cryptocurrency/GrowthGeneralPage";

// investment route imports 
import Login from "./cryptocurrency/auth/Login";
import Register from "./cryptocurrency/auth/Register";
import AdminDashboard from "./cryptocurrency/admin/AdminDashboard";
import UserDashboard from "./cryptocurrency/user/UserDashboard";
import InvestProtectedRoute from "./cryptocurrency/auth/ProtectedRoute";

// tesla route imports
import HomePage from "./tesla/leads/HomePage";
import Vehicles from "./tesla/leads/Vehicles";
import Configurator from "./tesla/leads/Configurator";
import TestDrive from "./tesla/leads/TestDrive";
import Support from "./tesla/leads/Support";
import Authentication from "./tesla/leads/Account";
import ProtectedRoute from "./tesla/auth/ProtectedRoute";
import TestDrivePayment from "./tesla/pages/test-drive/TestDrivePayment";
import VehicleX from "./tesla/leads/VehicleX";
import VehicleGT from "./tesla/leads/VehicleGT";
import VehicleV1 from "./tesla/leads/VehicleV1";



const App = () => {
  return (
    <Routes>
      {/* tesla section */}
      <Route path="/investment" element={<GrowthGeneralPage />} />
      <Route path="/invest/login" element={<Login />} />
      <Route path="/invest/register" element={<Register />} />
      <Route path="/invest/user-dashboard" element={<InvestProtectedRoute><UserDashboard /></InvestProtectedRoute>} />
      <Route path="/invest/admin/secured/dashboard" element={<InvestProtectedRoute><AdminDashboard /></InvestProtectedRoute>} />

{/* tesla section */}
      <Route path="/" element={<TeslaMainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicle/v1" element={<VehicleV1 />} />
        <Route path="/vehicle/x" element={<VehicleX />} />
        <Route path="/vehicle/gt" element={<VehicleGT />} />
        <Route path="/configurator" element={<Configurator />} />
        <Route path="/test-drive" element={<TestDrive />} />
        <Route path="/testdrive-payment-address" element={
          <ProtectedRoute>
            <TestDrivePayment />
          </ProtectedRoute>
        } />
        <Route path="/support" element={<Support />} />
       
        <Route path="/account" element={<Authentication />} />
      </Route>

    </Routes>
  )
}

export default App