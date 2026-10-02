import { Routes, Route } from "react-router-dom"
import TeslaMainLayout from "./tesla/TeslaMainLayout";
import GrowthGeneralPage from "./cryptocurrency/GrowthGeneralPage";

import HomePage from "./tesla/leads/HomePage";
import Vehicles from "./tesla/leads/Vehicles";
import Configurator from "./tesla/leads/Configurator";
import TestDrive from "./tesla/leads/TestDrive";
import Contact from "./tesla/leads/Contact";
import Support from "./tesla/leads/Support";
import Authentication from "./tesla/leads/Account";
import ProtectedRoute from "./tesla/auth/ProtectedRoute";
import TestDrivePayment from "./tesla/pages/test-drive/TestDrivePayment";



const App = () => {
  return (
    <Routes>
      <Route path="/investment" element={<GrowthGeneralPage />} />


      <Route path="/" element={<TeslaMainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/configurator" element={<Configurator />} />
        <Route path="/test-drive" element={<TestDrive />} />
        <Route path="/testdrive-booking" element={
          <ProtectedRoute>
            <TestDrivePayment />
          </ProtectedRoute>
        } />
        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<Authentication />} />
      </Route>

    </Routes>
  )
}

export default App