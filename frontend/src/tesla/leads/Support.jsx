import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, Clock, MapPin, ShoppingCart, Truck, Settings, Lock, MessageCircle, HandHelping, LifeBuoy, MessageCircleQuestion } from "lucide-react";
import { useState, useEffect } from "react";
import { API } from "../../constants/API";
import { useAuth } from "../context/AuthContext";

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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("")
  const { handleAxiosError } = useAuth();



  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("")
    setError("");

    const payload = {
      full_name: fullName,
      email: email,
      phone: phone,
      content: content,
    }

    try {
      const response = await API.post("/support/send-message", payload);
      setFullName("");
      setEmail("");
      setPhone("");
      setContent("");
      setMessage("Thank you for reaching out. Your message has been received, and our support team will get back to you shortly.");


    } catch (error) {
      handleAxiosError(error.response.data.detail);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (error || message) {
        setError("");
        setMessage("");
      }
    }, 3000)
    return () => clearTimeout(timer);
  }, [error, message]);

  return (

    <section className="w-full min-h-screen font-body bg-white pb-24">
      <div className="w-full items-center flex flex-col gap-6 mb-5 bg-gradient-to-b from-blue-100 to-white pt-52 text-center">
        <span className="text-black text-6xl font-bold">Customer Support</span>
        <p className="text-xl text-gray-600 font-semibold px-6 lg:px-4 max-w-3xl">
          We're here to help. Find answers to common questions or get in touch with our support team.
        </p>
      </div>

      <div className="flex flex-col gap-12 pt-24 px-4 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-4 items-center text-center">
          <h2 className="text-black text-6xl font-bold">Get In Touch</h2>
          <span className="text-lg text-gray-600 font-semibold">
            Choose the contact method that works best for you.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">

          <div className="flex flex-col justify-between p-8 rounded-lg bg-gray-100/90 w-full border border-transparent hover:border-blue-800/30 transition-all duration-300 min-h-50">
            <div className="flex flex-col gap-4">
              <div className="text-blue-800 bg-blue-500/10 w-12 h-12 rounded-md items-center justify-center flex shrink-0">
                <Mail size={28} />
              </div>
              <span className="text-xl font-bold text-black">Contact Form</span>
              <p className="text-md text-gray-600">Send us a message and we'll respond within 24 hours.</p>
            </div>
            <a href="/contact" className="text-blue-800 font-semibold text-md mt-6 inline-block hover:underline">
              Get in touch
            </a>
          </div>

          <div className="flex flex-col justify-between p-8 rounded-lg bg-gray-100/90 w-full border border-transparent hover:border-blue-800/30 transition-all duration-300 min-h-50">
            <div className="flex flex-col gap-4">
              <div className="text-blue-800 bg-blue-500/10 w-12 h-12 rounded-md items-center justify-center flex shrink-0">
                <Phone size={28} />
              </div>
              <span className="text-xl font-bold text-black">Phone Support</span>
              <p className="text-md text-gray-600">Call us during business hours for immediate assistance.</p>
            </div>
            <span className="text-gray-400 font-medium text-md mt-6 inline-block">
              Available soon
            </span>
          </div>

          <div className="flex flex-col justify-between p-8 rounded-lg bg-gray-100/90 w-full border border-transparent hover:border-blue-800/30 transition-all duration-300 min-h-50">
            <div className="flex flex-col gap-4">
              <div className="text-blue-800 bg-blue-500/10 w-12 h-12 rounded-md items-center justify-center flex shrink-0">
                <Clock size={28} />
              </div>
              <span className="text-xl font-bold text-black">Business Hours</span>
              <div className="text-md text-gray-600 flex flex-col gap-1">
                <span>Mon-Fri: 9 AM - 6 PM</span>
                <span>Sat-Sun: 10 AM - 5 PM</span>
              </div>
            </div>
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-6 inline-block">
              UTC-0 (all times)
            </span>
          </div>

          <div className="flex flex-col justify-between p-8 rounded-lg bg-gray-100/90 w-full border border-transparent hover:border-blue-800/30 transition-all duration-300 min-h-50">
            <div className="flex flex-col gap-4">
              <div className="text-blue-800 bg-blue-500/10 w-12 h-12 rounded-md items-center justify-center flex shrink-0">
                <MapPin size={28} />
              </div>
              <span className="text-xl font-bold text-black">Global Reach</span>
              <p className="text-md text-gray-600">We support customers worldwide. Contact us for your region.</p>
            </div>
            <span className="text-blue-800 font-semibold text-md mt-6 inline-block hover:underline cursor-pointer">
              Learn more
            </span>
          </div>

        </div>

        {/* suport by Topic */}
        <div className="flex flex-col gap-3 items-center mx-auto mt-25">
          <h1 className="text-black text-4xl md:text-6xl font-bold">Support by Topic</h1>
          <span className="text-xl text-gray-600/80">Find help for specific areas of your TESLA NEURALINK experience</span>
        </div>

        {/* activities being performed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-6 w-full">


          <div className="flex flex-col justify-between p-8 rounded-lg bg-gray-100/90 w-full border border-transparent hover:border-blue-800/30 transition-all duration-300 min-h-50">
            {/* icon div */}
            <div className="text-blue-800 bg-blue-500/10 w-12 h-12 rounded-md items-center justify-center flex shrink-0">
              <ShoppingCart size={28} />
            </div>
            <div className="flex flex-col gap-3 mt-6">
              <h2 className="text-xl font-semibold text-black">Purchase & Orders</h2>
              <div className="flex flex-col gap-3 text-gray-600 text-sm">
                <div className="flex">
                  <li className="text-blue-800"></li>
                  <span>How to place an order or request a purchase inquiry</span>
                </div>
                <div className="flex">
                  <li className="text-blue-800"></li>
                  <span>Understanding pricing and available options</span>
                </div>
                <div className="flex">
                  <li className="text-blue-800"></li>
                  <span>Customizing your vehicle with the configurator</span>
                </div>

                <div className="flex">
                  <li className="text-blue-800"></li>
                  <span>Payment and financing options</span>
                </div>


              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between p-8 rounded-lg bg-gray-100/90 w-full border border-transparent hover:border-blue-800/30 transition-all duration-300 min-h-50">
            {/* icon div */}
            <div className="text-blue-800 bg-blue-500/10 w-12 h-12 rounded-md items-center justify-center flex shrink-0">
              <Truck size={28} />
            </div>
            <div className="flex flex-col gap-3 mt-6">
              <h2 className="text-xl font-semibold text-black">Delivery & Tracking</h2>
              <div className="flex flex-col gap-3 text-gray-600 text-sm">
                <div className="flex">
                  <li className="text-blue-800"></li>
                  <span>Track your order status and delivery updates</span>
                </div>
                <div className="flex">
                  <li className="text-blue-800"></li>
                  <span>Deelivery timeline and logistics</span>
                </div>
                <div className="flex">
                  <li className="text-blue-800"></li>
                  <span>Pickup and delivery options</span>
                </div>

                <div className="flex">
                  <li className="text-blue-800"></li>
                  <span>Address changes and special requests</span>
                </div>


              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between p-8 rounded-lg bg-gray-100/90 w-full border border-transparent hover:border-blue-800/30 transition-all duration-300 min-h-50">
            {/* icon div */}
            <div className="text-blue-800 bg-blue-500/10 w-12 h-12 rounded-md items-center justify-center flex shrink-0">
              <Settings size={28} />
            </div>
            <div className="flex flex-col gap-3 mt-6">
              <h2 className="text-xl font-semibold text-black">Service & Maintenance</h2>
              <div className="flex flex-col gap-3 text-gray-600 text-sm">
                <div className="flex">
                  <li className="text-blue-800"></li>
                  <span>Scheduling service appointments</span>
                </div>
                <div className="flex">
                  <li className="text-blue-800"></li>
                  <span>Warrantly coverage and repairs</span>
                </div>
                <div className="flex">
                  <li className="text-blue-800"></li>
                  <span>Maintenance schedules and reminders</span>
                </div>

                <div className="flex">
                  <li className="text-blue-800"></li>
                  <span>Service history and documentation</span>
                </div>


              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between p-8 rounded-lg bg-gray-100/90 w-full border border-transparent hover:border-blue-800/30 transition-all duration-300 min-h-50">
            {/* icon div */}
            <div className="text-blue-800 bg-blue-500/10 w-12 h-12 rounded-md items-center justify-center flex shrink-0">
              <Lock size={28} />
            </div>
            <div className="flex flex-col gap-3 mt-6">
              <h2 className="text-xl font-semibold text-black">Account & Security</h2>
              <div className="flex flex-col gap-3 text-gray-600 text-sm">
                <div className="flex">
                  <li className="text-blue-800"></li>
                  <span>Creating and managing your account</span>
                </div>
                <div className="flex">
                  <li className="text-blue-800"></li>
                  <span>Password reset and account recovery</span>
                </div>
                <div className="flex">
                  <li className="text-blue-800"></li>
                  <span>Managing your My Garage vehicles</span>
                </div>

                <div className="flex">
                  <li className="text-blue-800"></li>
                  <span>Privacy and security information</span>
                </div>


              </div>
            </div>
          </div>

        </div>

        {/* message form */}
        <div className="flex flex-col gap-3 items-center mx-auto mt-25">
          <div className="flex flex-col gap-3 items-center">
            <h2 className="text-3xl font-bold text-black">Send Us a Message</h2>
            <span className="text-xl text-gray-600">Fill out the form below and we'll get back to you as soon as possible</span>
          </div>

          <div className="shadow-sm p-4 rounded-xl w-full max-w-xl">
            {/* error message section */}
            {error && <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              <span className="mt-4 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-3">{error}</span>
            </div>}
            {message && <div className="my-4 p-3 rounded-md bg-green-500/15 duration-300 transition-all">
              <span className="text-green-600 text-lg text-center">{message}</span>
            </div>}
            <form onSubmit={sendMessage} className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="full name">Full Name*</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" required className="px-3 py-2 rounded-lg border outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-800 ring-offset-2 focus:ring-offset-0 border-gray-600/20" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="Email address">Email Address*</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="px-3 py-2 rounded-lg border outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-800 ring-offset-2 focus:ring-offset-0 border-gray-600/20" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="Phone number">Phone Number*</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required className="px-3 py-2 rounded-lg border outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-800 ring-offset-2 focus:ring-offset-0 border-gray-600/20" />
              </div>
              {/* <div className="flex flex-col gap-1">
                <label htmlFor="subject">Subject*</label>
                <input type="text" required className="px-3 py-2 rounded-lg border outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-800 ring-offset-2 focus:ring-offset-0 border-gray-600/20" />
              </div> */}
              <div className="flex flex-col gap-1">
                <label htmlFor="subject">Message*</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} name="message" id="message" required className="px-3 py-8 rounded-md border outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-800 ring-offset-2 focus:ring-offset-0 border-gray-600/20" />
              </div>
              <div className="w-full">
                <button disabled={loading} className="text-md text-gray-100 font-bold py-3 w-full bg-blue-900/98 rounded-md hover:bg-blue-900 transition-all duration-300 ">
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
            {/* <a href="/support" className="fixed top-165 right-5 text-blue-800">
              <MessageCircleQuestion className="hover:scale-110 transition-all duration-150" size={64} />
            </a> */}
          </div>
        </div>

      </div>
    </section>
  )
}
