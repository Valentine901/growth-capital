import { ArrowRight, Compass } from "lucide-react";

const Vehicle1 = () => {
  return (
    <section className="w-full min-h-screen bg-black pt-40 md:pt-0 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Blurry Background Image Layer */}
      <div 
        className="absolute inset-0 bg-[url(src/assets/tesla-images/tesla-vehicle.jpeg)] bg-cover bg-center bg-no-repeat blur-[6px] scale-105 z-0" 
      />
      
      {/* Dark Overlay Tint Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />

      {/* Foreground Interactive Content Layer */}
      <div className="flex flex-col text-center w-full max-w-5xl mx-auto z-20">
        <div className="flex items-center gap-2 justify-center text-blue-500 text-xs md:text-sm tracking-[0.25em] font-bold uppercase mb-4 animate-pulse">
          <Compass size={16} className="text-blue-500" />
          <span>The Neural Link Era</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-none mx-auto mb-6 drop-shadow-2xl uppercase tracking-tighter max-w-4xl">
          Minds Aligned. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-200">
            Machines Refined.
          </span>
        </h1>

        <div className="flex flex-col gap-2 text-lg sm:text-xl lg:text-2xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed tracking-wide">
          <p>The world's first cybernetic vehicle interface. Driven by thought, sustained by ultimate electric performance.</p>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 mx-auto justify-center mt-12 px-4 sm:px-0">
          <a 
            href="/vehicles" 
            className="flex items-center justify-center gap-2 w-full sm:w-64 text-white text-lg font-bold py-4 px-8 rounded-xl bg-blue-800 hover:bg-blue-900 shadow-lg shadow-blue-900/30 transition-all duration-300 group hover:-translate-y-0.5"
          >
            <span>Enter the Lineup</span>
            <ArrowRight size={18} className="transform transition-transform duration-200 group-hover:translate-x-1" />
          </a>

          <a 
            href="/configurator" 
            className="flex items-center justify-center gap-2 w-full sm:w-64 border border-white/40 text-white rounded-xl text-lg font-bold py-4 px-8 bg-black/20 backdrop-blur-md hover:bg-white hover:text-black hover:border-white transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Sync Your Model</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Vehicle1;
