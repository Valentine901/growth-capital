import { Routes, Route } from "react-router-dom"
import TeslaMainLayout from "./tesla/TeslaMainLayout";
import GrowthGeneralPage from "./cryptocurrency/GrowthGeneralPage";

import HomePage from "./tesla/leads/HomePage";
import Vehicles from "./tesla/leads/Vehicles";
import Configurator from "./tesla/leads/Configurator";
import Compare from "./tesla/leads/Compare";
import TestDrive from "./tesla/leads/TestDrive";
import Contact from "./tesla/leads/Contact";
import Support from "./tesla/leads/Support";



const App = () => {
  return (
    <Routes>
      {/* visitors investment route */}
        <Route path="/investment" element={<GrowthGeneralPage />} />

    

      {/*Tesla routes (Nested approach for a clean URL structure) */}
      
      <Route path="/" element={<TeslaMainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/configurator" element={<Configurator />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/test-drive" element={<TestDrive />} />
        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<Contact />} />
      </Route> 
     
    </Routes>
  )
}

export default App