import { useTeslaQueryContext } from "../../context/QueryContext";
import { BASE_URL } from "../../../constants/API";

const Compare1 = () => {
  const { vehicles } = useTeslaQueryContext();


  const features = [
    { label: "Starting Price", key: "startingPrice" },
    { label: "Vehicle Type", key: "vehicleType" },
    { label: "Seating Capacity", key: "seatingCapacity" },
    { label: "Cargo Space", key: "cargoSpace" },
    { label: "Drive Configuration", key: "driveConfiguration" },
    { label: "Performance Focus", key: "performanceFocus" },
    { label: "All Weather Capability", key: "allWeatherCapability" },
    { label: "Towing Capability", key: "towingCapability" },
    { label: "Fast Charging", key: "fastCharging" },
    { label: "Track Mode", key: "trackMode" },
    { label: "Advanced Autopilot", key: "advancedAutopilot" },
    { label: "Premium Audio System", key: "premiumAudioSystem" },
    { label: "Glass Roof", key: "glassRoof" },
    { label: "Best For", key: "bestFor" },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 px-4 pt-32 pb-12 flex flex-col gap-12">
      
      <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
        <h2 className="text-5xl lg:text-7xl text-black font-bold tracking-tight">
          Compare Models
        </h2>
        <p className="text-lg lg:text-xl text-gray-500 leading-relaxed">
          Discover how the TESLA NEURALINK lineup compares. Find the perfect model for your driving needs.
        </p>
      </div>

  
      <div className="w-full overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 text-sm font-semibold text-gray-600">Feature</th>
              {vehicles.map((vehicle) => (
                <th key={vehicle.id || vehicle.model} className="p-4 min-w-[400px]">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="max-w- w-full h-34 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                      <img
                        className="w-full h-full object-contain"
                        src={`${BASE_URL}/${vehicle.image}`}
                        alt={vehicle.model}
                      />
                    </div>
                    <span className="text-lg font-bold text-gray-900">{vehicle.model}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {features.map((feature) => (
              <tr key={feature.key} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-medium text-gray-900 bg-gray-50/30 sticky left-0 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                  {feature.label}
                </td>
                {vehicles.map((vehicle) => (
                  <td key={`${vehicle.id || vehicle.model}-${feature.key}`} className="p-4 text-center">
                   
                    {vehicle[feature.key] !== undefined ? String(vehicle[feature.key]) : "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compare1;
