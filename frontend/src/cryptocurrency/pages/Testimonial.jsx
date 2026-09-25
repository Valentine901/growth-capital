import {Lock, Landmark, Shield, Star, StarCheck } from "lucide-react";

const Testimonial = () => {
  return (
    <section id="testimonial" className="mx-auto max-w-7xl px-6 py-24 flex flex-col items-center gap-4 w-full">
  {/* Header Section */}
  <div className="flex flex-col items-center gap-1 text-3xl md:text-4xl font-bold text-amber-300 text-center">
    <h2>What Our Clients Say</h2>
    <div className="h-0.75 bg-amber-300 rounded-xl w-24"></div>
  </div>

  {/* Description */}
  <div className="max-w-xl mx-auto text-center w-full text-sm mt-2">
    <p>Hear from our valued clients about their experience growing their wealth with Growth Capital Limited.</p>
  </div>


  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-12 px-6 md:px-12">

  
    <div className="flex flex-col justify-between items-center text-center gap-4 w-full rounded-xl p-6 border border-amber-300/10 bg-amber-300/5">
      <div className="flex flex-col items-center gap-3 w-full">
     
        <div className="flex flex-col items-center gap-2">
        
          <div className="w-16 h-16 rounded-full overflow-hidden border border-amber-300/30 bg-neutral-800">
            <img src="src/assets/client1.jpg" className="w-full h-full object-cover" alt="David Vance Profile Picture" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-lg text-amber-300 font-semibold leading-tight">David Vance</h3>
            <div className="text-amber-300 flex items-center justify-center gap-0.5">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Comment Text */}
        <p className="text-sm text-gray-300/90 leading-relaxed italic">
          "I was highly skeptical about crypto investing at first, but their streamlined platform made the entire process incredibly straightforward. Tracking my portfolio's daily returns in real-time gave me the peace of mind I needed. Truly top-tier service."
        </p>
      </div>
      
      <span className="text-amber-300/80 font-medium text-xs tracking-wider uppercase">Crypto Portfolio Investor</span>
    </div>

    <div className="flex flex-col justify-between items-center text-center gap-4 w-full rounded-xl p-6 border border-amber-300/10 bg-amber-300/5">
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="flex flex-col items-center gap-2">
          
          <div className="w-16 h-16 rounded-full overflow-hidden border border-amber-300/30 bg-neutral-800">
            <img src="src/assets/client4.jpg" className="w-full h-full object-cover" alt="Elena Rostova Profile Picture" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-lg text-amber-300 font-semibold leading-tight">Elena Rostova</h3>
            <div className="text-amber-300 flex items-center justify-center gap-0.5">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-300/90 leading-relaxed italic">
          "Navigating volatile crypto markets used to stress me out, but their strategic investment plans completely took the guesswork out of it. Making deposits is highly secure, and watching my legacy grow month after month has been amazing."
        </p>
      </div>
      
      <span className="text-amber-300/80 font-medium text-xs tracking-wider uppercase">Crypto Growth Investor</span>
    </div>

    <div className="flex flex-col justify-between items-center text-center gap-4 w-full rounded-xl p-6 border border-amber-300/10 bg-amber-300/5">
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="flex flex-col items-center gap-2">
      
          <div className="w-16 h-16 rounded-full overflow-hidden border border-amber-300/30 bg-neutral-800">
            <img src="src/assets/client3.jpg" className="w-full h-full object-cover" alt="Marcus Thorne Profile Picture" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-lg text-amber-300 font-semibold leading-tight">Marcus Thorne</h3>
            <div className="text-amber-300 flex items-center justify-center gap-0.5">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-300/90 leading-relaxed italic">
          "What separates this platform from others is the absolute ease of withdrawal. When my term ended, pulling my profits and capital back into my bank account was seamless and fast. Highly recommended for serious investors."
        </p>
      </div>
      
      <span className="text-amber-300/80 font-medium text-xs tracking-wider uppercase">Crypto Yield Investor</span>
    </div>

   
    <div className="flex flex-col justify-between items-center text-center gap-4 w-full rounded-xl p-6 border border-amber-300/10 bg-amber-300/5">
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="flex flex-col items-center gap-2">

          <div className="w-16 h-16 rounded-full overflow-hidden border border-amber-300/30 bg-neutral-800">
            <img src="src/assets/client2.jpg" className="w-full h-full object-cover" alt="Andre Brooks Profile Picture" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-lg text-amber-300 font-semibold leading-tight">Andre Brooks</h3>
            <div className="text-amber-300 flex items-center justify-center gap-0.5">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-300/90 leading-relaxed italic">
          "The security protocols here are outstanding. I’ve tried several digital asset platforms over the years, but the level of transparency and stable returns I’ve experienced here makes building a long-term portfolio effortless."
        </p>
      </div>
      
      <span className="text-amber-300/80 font-medium text-xs tracking-wider uppercase">Asset Management Client</span>
    </div>

  </div>
</section>

  )
}

export default Testimonial;