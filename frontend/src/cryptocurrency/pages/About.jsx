
import { Layers3, ShieldAlert, Headphones} from "lucide-react";

const About = () => {



  const secondStats = [
    { icon: Layers3, label: "Diversified", desc: "Strength across 5 key sectors" },
    { icon: ShieldAlert, label: "Risk Managed", desc: "Strategic asset allocation" },
    { icon: Headphones, label: "Expert Support", desc: "24/7 dedicated advisors" },
  ];



  return (
         <section id="about" className="mx-auto min-h-screen max-w-7xl px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl text-amber-200 font-bold px-6 md:px-12">About Growth Capital Limited</h1>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="px-6 md:px-12">
                Our global clientele. We move beyond traditional models by strategically allocating capital across a spectrum of high-growth sectors, from tangible assets like precious metals and agriculture to dynamic digital markets like cryptocurrency and forex.
              </p>
              <p className="px-6 md:px-12">
                Our mission is to provide secure, transparent, and high-performance investment opportunities. By combining expert analysis with advanced technology, we navigate market complexities to deliver consistent returns and long-term value for our investors.
              </p>
            </div>

            <div className="flex gap-3 mx-8">
              {secondStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="group rounded-lg w-full max-w-40 py-4 text-center duration-300 flex items-center px-2 bg-gray-700/20">

                    <div className="flex w-1/4">
                      <Icon size={28} strokeWidth={1.8} className="text-amber-200 transition-transform duration-300" />
                    </div>
                    <div className="flex flex-col w-2/3">
                      <h2 className="mt-3 font-heading text-md font-bold text-white">{stat.label}</h2>
                      <p className="font-body mt-1 text-sm text-gray-400">{stat.desc}</p>
                    </div>

                  </div>
                )
              })}
            </div>
          </div>

          {/* bank image */}
          <div className="w-full h-[450px] rounded-lg overflow-hidden px-6 md:px-12">
            <img className="w-full h-full object-cover" src="src/assets/crypt_image_bank.webp" alt="crypto-bank" />
          </div>
        </section>
  )
}

export default About;