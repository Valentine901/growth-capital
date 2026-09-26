import { Award, Coins, Layers3, Users } from "lucide-react";

const HomePg = () => {
  const stats = [
    { icon: Coins, value: "$50B+", label: "Assets Managed" },
    { icon: Users, value: "250k+", label: "Global Clients" },
    { icon: Layers3, value: "5", label: "Core Sectors" },
    { icon: Award, value: "6+", label: "Years of Experience" },
  ];




  return (
    <section id="home" className="home-hero min-h-screen w-full pt-42 pb-24  relative">
      {/* Background network pattern */}
      <div className="hero-network"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Hero content */}
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="font-heading font-bold leading-tight tracking-tight text-4xl">
            Strategic Investing for a <span className="text-yellow-400">Prosperous Future</span>
          </h1>

          <p className="font-body mx-auto mt-7 max-w-4xl leading-relaxed text-gray-300 text-xl">
            Growth Capital Limited strategically invests across global sectors—from tangible assets to digital markets—to deliver robust growth and security for your capital.
          </p>

          {/* Hero buttons */}
          <div className="mt-10 flex items-center justify-center gap-4 sm:flex-row">
            <button className="group flex items-center justify-center gap-2 rounded-md bg-amber-300 px-8 py-4 font-heading font-bold text-black transition-all duration-300 hover:bg-yellow-200 hover:shadow-lg hover:shadow-yellow-400/20">
              Client Login
            </button>

            <button className="rounded-md border-2 border-gray-300 px-8 py-3.5 font-heading font-medium text-yellow-400 transition-all duration-300  hover:bg-yellow-400/5">
              Open Account
            </button>
          </div>
        </div>

        {/* STATISTICS */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 max-w-[60rem] gap-4 w-full mx-auto justify-items-center px-6 md:px-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="group rounded-lg border border-yellow-500/20 bg-[#080808]/90 w-full lg:max-w-55 py-4 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-500/5">
                <div className="flex justify-center">
                  <Icon size={45} strokeWidth={1.8} className="text-amber-200 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h2 className="mt-5 font-heading text-3xl font-bold text-amber-200">{stat.value}</h2>
                <p className="font-body mt-3 text-base text-gray-400">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

  );
};

export default HomePg;
