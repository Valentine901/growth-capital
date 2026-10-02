// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Mail } from "lucide-react";


// const Support = () => {
//   return (
//     <div>
//       <Navbar />
//       <Section />
//       <Footer />
//     </div>
//   )
// }

// export default Support;

// const Section = () => {
//   return(
//     <section className="w-full min-h-screen font-body">
//       <div className="w-full items-center flex flex-col gap-6 mb-5 bg-gradient-to-b from-blue-100 to-white pt-52 text-center">
//         <div>
          
//         </div>
//         <span className="text-black text-6xl font-bold">Customer Support</span>
//         <p className="text-xl text-gray-600 font-semibold px-6 lg:px-4">We're here to help. Find answers to common questions or get in touch with our support team.</p>
//       </div>

//       {/* get in touch section */}
//       <div className="flex flex-col gap-8 pt-24 px-4">
//         <div className="flex flex-col gap-4 items-center">
//           <h2 className="text-black text-6xl font-bold">Get In Touch</h2>
//           <span className="text-lg text-gray-600 font-semibold">
//             Choose the contact method that works best for you.
//           </span>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full justify-items-center">
//           <div className="flex flex-col gap-4 p-6 rounded-lg bg-gray-100/90 sm:max-w-none w-full hover:border hover:border-blue-800/30 transition-all duration-300">
//             {/*  */}
//             <div className="text-blue-800 bg-blue-500/10 w-15 h-15 rounded-md items-center justify-center flex">
//               <Mail size={32} />
//             </div>
//             <span className="text-xl font-bold text-black">Contact Form</span>
//             <p className="text-md text-gray-600">Send us a message and we'll response withing 24 hours.</p>
//             <a href="/contact" className="text-blue-800 font-semibold text-md">Get In touch</a>
//           </div>
//         </div>


//       </div>
//     </section>
//   )
// }







import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail } from "lucide-react";


const Support = () => {
  return (
    <div>
      <Navbar />
      <Section />
      <Footer />
    </div>
  )
}

export default Support;

const Section = () => {
  return(
    <section className="w-full min-h-screen font-body">
      <div className="w-full items-center flex flex-col gap-6 mb-5 bg-gradient-to-b from-blue-100 to-white pt-52 text-center">
        <div>
          
        </div>
        <span className="text-black text-6xl font-bold">Customer Support</span>
        <p className="text-xl text-gray-600 font-semibold px-6 lg:px-4">We're here to help. Find answers to common questions or get in touch with our support team.</p>
      </div>

      {/* get in touch section */}
      <div className="flex flex-col gap-8 pt-24 px-4">
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-black text-6xl font-bold">Get In Touch</h2>
          <span className="text-lg text-gray-600 font-semibold">
            Choose the contact method that works best for you.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full justify-items-center">
          <div className="flex flex-col gap-4 p-6 rounded-lg bg-gray-100/90 sm:max-w-none w-full hover:border hover:border-blue-800/30 transition-all duration-300">
            {/*  */}
            <div className="text-blue-800 bg-blue-500/10 w-15 h-15 rounded-md items-center justify-center flex">
              <Mail size={32} />
            </div>
            <span className="text-xl font-bold text-black">Contact Form</span>
            <p className="text-md text-gray-600">Send us a message and we'll response withing 24 hours.</p>
            <a href="/contact" className="text-blue-800 font-semibold text-md">Get In touch</a>
          </div>
        </div>


      </div>
    </section>
  )
}
