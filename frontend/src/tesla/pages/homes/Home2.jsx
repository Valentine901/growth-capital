import { useTeslaQueryContext } from "../../context/QueryContext";
import { BASE_URL } from "../../../constants/API";
import { ArrowRight } from "lucide-react";

const Home2 = () => {
  const { vehicles } = useTeslaQueryContext();

  return (
    <section className="w-full min-h-screen bg-gray-50 flex flex-col gap-6 mt-24 px-3 pb-12">
      {/* Header Section */}
      <div className="flex flex-col gap-4 w-full mt-8 px-4 md:px-6 text-center mx-auto">
        <h2 className="text-black text-4xl sm:text-5xl lg:text-6xl text-center font-bold tracking-wider leading-tight">
          The TESLA NEURALINK Lineup
        </h2>
        <span className="text-gray-600 text-lg md:text-xl leading-relaxed">
          Three distinct models engineered for performance, comfort and the future of driving.
        </span>
      </div>

      {/* Grid Layout Container: 1 col on small, 2 cols on medium (md), 3 cols on large (lg) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-7xl mx-auto w-full">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="flex flex-col mx-auto items-center justify-center gap-4 rounded-xl border border-gray-100 shadow-sm transition-shadow duration-300 hover:shadow-md h-full w-full max-w-160 "
          >
            {/* Top Half of Card (Image & Metadata) */}
            <div className="w-full flex flex-col gap-4">
              {/* Image Box - Changed h-128 to a responsive h-64 md:h-72 or h-80 for dynamic scaling */}
              <div className="h-64 sm:h-72 md:h-80 w-full overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-out"
                  src={`${BASE_URL}/${vehicle.image}`}
                  alt={vehicle.name}
                />
              </div>

              {/* Title & Description */}
              <div className="w-full flex flex-col gap-2 px-3">
                <h3 className="text-3xl text-black font-semibold tracking-wide">
                  {vehicle.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {vehicle.model}
                </p>
              </div>

              <div className="flex flex-col gap-4 pb-4 w-full px-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-blue-800 text-3xl font-bold font-sans tracking-wide">
                    ${Number(vehicle.price).toLocaleString()}
                  </span>
                  <span className="text-gray-600 text-xs capitalize tracking-wider">
                    Estimated price
                  </span>
                </div>

                <a
                  href={`/vehicles/${vehicle.id}`}
                  className="flex items-center gap-2 text-blue-800 font-medium group w-fit transition-colors duration-200"
                >
                  <span className="tracking-wide text-lg font-semibold">Explore</span>
                  <ArrowRight
                    size={18}
                    className="transform transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>

            {/* Bottom Half of Card (Pricing & CTA Button pinned together) */}

          </div>
        ))}
      </div>
    </section>
  );
};

export default Home2;
