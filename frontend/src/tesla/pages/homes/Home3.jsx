import { Zap, BatteryCharging, Cpu, ShieldCheck, ArrowRight } from "lucide-react";

const Home3 = () => {
  return (
    <section className="w-full min-h-screen bg-gray-100 flex flex-col pb-16 pt-24 px-4 md:px-8 mx-auto justify-between gap-24">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 w-full text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-black text-4xl md:text-5xl font-bold tracking-tight">Engineered for Excellence</h2>
          <span className="text-lg md:text-xl text-gray-600 leading-relaxed">Every TESLA NEURALINK combines cutting-edge innovation with refined engineering.</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <div className="flex flex-col justify-between gap-3 shadow-sm border border-gray-100 bg-white p-6 rounded-xl hover:shadow-xl transition-all duration-300 h-full">
            <div>
              <div className="flex items-center justify-center p-1 w-12 h-12 bg-blue-500/15 rounded-xl text-blue-800/80">
                <Zap size={32} />
              </div>
              <div className="flex flex-col gap-2 mt-6">
                <h3 className="text-black text-lg font-bold tracking-tight">Instant Torque</h3>
                <p className="text-gray-600 text-xs leading-relaxed">Experience immediate acceleration with our advanced electric powertrain.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 shadow-sm border border-gray-100 bg-white p-6 rounded-xl hover:shadow-xl transition-all duration-300 h-full">
            <div>
              <div className="flex items-center justify-center p-1 w-12 h-12 bg-blue-500/15 rounded-xl text-blue-800/80">
                <BatteryCharging size={32} />
              </div>
              <div className="flex flex-col gap-2 mt-6">
                <h3 className="text-black text-lg font-bold tracking-tight">Extended Range</h3>
                <p className="text-gray-600 text-xs leading-relaxed">Go further with high-capacity battery systems engineered for distance.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 shadow-sm border border-gray-100 bg-white p-6 rounded-xl hover:shadow-xl transition-all duration-300 h-full">
            <div>
              <div className="flex items-center justify-center p-1 w-12 h-12 bg-blue-500/15 rounded-xl text-blue-800/80">
                <Cpu size={32} />
              </div>
              <div className="flex flex-col gap-2 mt-6">
                <h3 className="text-black text-lg font-bold tracking-tight">Smart Integration</h3>
                <p className="text-gray-600 text-xs leading-relaxed">Seamless connectivity with intelligent features that adapt to you.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 shadow-sm border border-gray-100 bg-white p-6 rounded-xl hover:shadow-xl transition-all duration-300 h-full">
            <div>
              <div className="flex items-center justify-center p-1 w-12 h-12 bg-blue-500/15 rounded-xl text-blue-800/80">
                <ShieldCheck size={32} />
              </div>
              <div className="flex flex-col gap-2 mt-6">
                <h3 className="text-black text-lg font-bold tracking-tight">Advanced Safety</h3>
                <p className="text-gray-600 text-xs leading-relaxed">Comprehensive systems designed to protect you and your passengers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white p-8 md:p-12 rounded-2xl max-w-7xl mx-auto shadow-sm border border-gray-100 mt-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-tight">Ready to Drive the Future?</h2>
            <span className="text-gray-600 text-base md:text-lg leading-relaxed">Experience the TESLA NEURALINK difference. Schedule a test drive or configure your own.</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
            <a href="/configure" className="flex items-center justify-center gap-3 text-gray-100 font-semibold text-base bg-blue-800 py-3.5 px-8 rounded-xl hover:bg-blue-900 transition-colors duration-200 shadow-md group">
              <span>Build Yours</span>
              <ArrowRight size={20} className="transform transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a href="/test-drive" className="flex items-center justify-center gap-3 text-gray-700 font-semibold text-base bg-gray-100 py-3.5 px-8 rounded-xl border border-gray-300 hover:bg-gray-200 transition-colors duration-200 group">
              <span>Schedule test drive</span>
              <ArrowRight size={20} className="transform transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home3;
