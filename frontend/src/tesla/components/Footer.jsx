import { ArrowUpRight, Car } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-16 pb-8 px-4 md:px-8 mx-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h3 className="text-xl font-bold tracking-wider text-blue-800 flex gap-3"> <Car size={24} />TESLA NEURALINK</h3>
          <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
            Pioneering the future of electric mobility with cutting-edge technology and sustainable innovation.
          </p>
          <div className="flex flex-col gap-1.5 mt-2">
            <a href="mailto:info@tasla-neuralink.com" className="text-sm text-blue-800 hover:underline w-fit">
              info@tasla-neuralink.com
            </a>
            <a href="tel:+18008275201" className="text-sm text-gray-600 hover:text-black w-fit">
              +1 (800) TASLA-01
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-black">Vehicles</h4>
          <ul className="flex flex-col gap-2.5">
            <li><a href="/vehicles/v1" className="text-sm text-gray-600 hover:text-blue-800 transition-colors">TASLA NEURALINK V1</a></li>
            <li><a href="/vehicles/x" className="text-sm text-gray-600 hover:text-blue-800 transition-colors">TASLA NEURALINK X</a></li>
            <li><a href="/vehicles/gt" className="text-sm text-gray-600 hover:text-blue-800 transition-colors">TASLA NEURALINK GT</a></li>
            <li><a href="/compare" className="text-sm text-gray-600 hover:text-blue-800 transition-colors">Compare Models</a></li>
            <li><a href="/configure" className="text-sm text-gray-600 hover:text-blue-800 transition-colors">Build Yours</a></li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-black">Experience</h4>
          <ul className="flex flex-col gap-2.5">
            <li><a href="/charging" className="text-sm text-gray-600 hover:text-blue-800 transition-colors">Charging & Energy</a></li>
            <li><a href="/trips" className="text-sm text-gray-600 hover:text-blue-800 transition-colors">Trip Planning</a></li>
            <li><a href="/technology" className="text-sm text-gray-600 hover:text-blue-800 transition-colors">Technology</a></li>
            <li><a href="/app" className="text-sm text-gray-600 hover:text-blue-800 transition-colors flex items-center gap-1">Mobile App <ArrowUpRight size={14} /></a></li>
            <li><a href="/test-drive" className="text-sm text-gray-600 hover:text-blue-800 transition-colors">Test Drive</a></li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-black">Support</h4>
          <ul className="flex flex-col gap-2.5">
            <li><a href="/service" className="text-sm text-gray-600 hover:text-blue-800 transition-colors">Service</a></li>
            <li><a href="/shop" className="text-sm text-gray-600 hover:text-blue-800 transition-colors">Shop</a></li>
            <li><a href="/account" className="text-sm text-gray-600 hover:text-blue-800 transition-colors">Account</a></li>
            <li><a href="/contact" className="text-sm text-gray-600 hover:text-blue-800 transition-colors">Contact Us</a></li>
            <li><a href="/legal" className="text-sm text-gray-600 hover:text-blue-800 transition-colors">Legal</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-gray-500">
          &copy; 2026 TASLA NEURALINK. All rights reserved.
        </span>
        <div className="flex gap-6">
          <a href="/privacy" className="text-xs text-gray-500 hover:text-black transition-colors">Privacy Policy</a>
          <a href="/terms" className="text-xs text-gray-500 hover:text-black transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
