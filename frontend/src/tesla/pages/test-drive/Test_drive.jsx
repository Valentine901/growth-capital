import { Car, Calendar, MapPin } from "lucide-react";
import { CarModelEnum, PaymentMethod } from "../../components/Enum";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API } from "../../../constants/API";
import Loading from "../../components/Loading";

const Test_drive = () => {
  return (
    <div>
      <Main />
    </div>
  )
}

export default Test_drive

const Main = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    vehicleModel: "",
    preferredDate: "",
    preferredTime: "",
    preferredLocation: "",
    zipCode: "",
    paymentMethod: "",
  });
  const { handleAxiosError } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const estimatedPrice = 55.00;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      full_name: formData.fullName,
      email_address: formData.email,
      phone: formData.phoneNumber,
      preferred_date: formData.preferredDate,
      preferred_time: `${formData.preferredDate}T${formData.preferredTime}`,
      vehicle_model: formData.vehicleModel,
      crypto_currency: formData.paymentMethod, 
      preferred_location: formData.preferredLocation,
      zip_code: formData.zipCode,
      estimated_total: estimatedPrice, 
    };

    try {
      const response = await API.post("/test-drive/book", payload);
      
      const save = {
        "id": response.data.id,
        "user_id": response.data.user_id,
        "full_name": response.data.full_name,
        "email_address": response.data.email_address,
        "vehicle_model": response.data.vehicle_model,
        "zip_code": response.data.zip_code,
        "payment_status": response.data.payment_status.value,
        "estimated_total": response.data.estimated_total,
        "generated_crypto_address": response.data.generated_crypto_address,
        "exact_crypto_amount": response.data.exact_crypto_amount,
        "crypto_ticker": response.data.crypto_ticker
      }
      localStorage.setItem("payment-data", JSON.stringify(save))
      navigate("/testdrive-payment-address");
      // return console.log(response.data);
      
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };
  // move this upper componenet to parent to pass the values as props

  if (loading) return (
    <Loading />
  )

  return (
    <div className="w-full min-h-screen bg-gray-100 pt-24 flex flex-col gap-8">
      <section className=" flex flex-col gap-12 justify-center mx-auto w-full pt-20">
        <div className="flex flex-col gap-4 text-center mx-auto max-w-3xl w-full">
          <h1 className="text-5xl md:text-6xl lg:text-[70px] text-black font-bold">Schedule a Test Drive</h1>
          <span className="text-gray-600 text-xl  tracking-wide px-12 md:px-24">Experience the performance, technology, and luxury of TASLA NEURALINK vehicles firsthand.</span>
        </div>

        {/* car selection, location option etc section */}
        <div className="grid grid-cols-1 lg:flex gap-8 lg:gap-28 w-full mx-auto justify-center mt-28 lg:mt-32">
          <div className="flex flex-col gap-2 items-center">
            <div className="rounded-full bg-blue-500/10 text-blue-800/70 w-18 h-18 items-center justify-center flex"><Car size={42} /></div>
            <span className="text-black font-semibold text-lg">Choose Your Model</span>
            <span className="text-md text-gray-600">
              Select from V1 sedan, X SUV, or GT sports car
            </span>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <div className="rounded-full bg-blue-500/10 text-blue-800/70 w-18 h-18 items-center justify-center flex"><Calendar size={38} /></div>
            <span className="text-black font-semibold text-lg">Pick a Date</span>
            <span className="text-md text-gray-600">
              Schedule at your convenience
            </span>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <div className="rounded-full bg-blue-500/10 text-blue-800/70 w-18 h-18 items-center justify-center flex"><MapPin size={38} /></div>
            <span className="text-black font-semibold text-lg">Visit Location</span>
            <span className="text-md text-gray-600">
              Test drive at our facility
            </span>
          </div>

        </div>
      </section>

      {/* booking form section */}
      <section className="w-full items-center justify-center flex mt-24">
        <div className="max-w-2xl flex items-center w-full p-8 bg-blue-100/25 rounded-xl">
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <div className="flex flex-col gap-3 mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-black">Request Your Test Drive</h2>
              <span className="text-black text-lg font-semibold">Your Information</span>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="fullName">Full Name*</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="p-3 rounded-md bg-gray-50 border-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email Address*</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="p-3 rounded-md bg-gray-50 border-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="phoneNumber">Phone Number*</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="p-3 rounded-md bg-gray-50 border-none"
              />
            </div>

            {/* test drive form details section */}
            <div className="flex flex-col gap-7 mt-4 pt-3 bg-gray-100">
              <h2 className="text-lg text-black font-semibold">Test Drive Details</h2>

              <div className="flex flex-col gap-1">
                <label htmlFor="vehicleModel">Vehicle Model*</label>
                <select
                  id="vehicleModel"
                  name="vehicleModel"
                  required
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  className="py-3 bg-gray-200 rounded-md"
                >
                  <option value="" disabled>Select a model</option>
                  {Object.values(CarModelEnum).map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="preferredDate">Preferred Date*</label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  required
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="p-3 rounded-md bg-gray-50 border-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="preferredTime">Preferred Time*</label>
                <input
                  type="time"
                  id="preferredTime"
                  name="preferredTime"
                  required
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="p-3 rounded-md bg-gray-50 border-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="preferredLocation">Preferred Location*</label>
                <input
                  type="text"
                  id="preferredLocation"
                  name="preferredLocation"
                  required
                  value={formData.preferredLocation}
                  onChange={handleChange}
                  className="p-3 rounded-md bg-gray-50 border-none"
                  placeholder="City"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="zipCode">Zip Code*</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="p-3 rounded-md bg-gray-50 border-none"
                />
              </div>

              <div className="flex flex-col gap-2 bg-blue-100/50 p-4 rounded-xl border border-blue-500/20">
                <h2 className="text-xl font-semibold text-black">Test Drive Reservation Fee</h2>

                <div className="flex flex-col gap-1 mt-2 mb-4">
                  <label htmlFor="paymentMethod" className="text-sm font-semibold text-gray-700">Payment Method*</label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    required
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="py-3 bg-gray-200 rounded-md"
                  >
                    <option value="" disabled>Select a payment method</option>
                    {Object.values(PaymentMethod).map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-between mt-3">
                  <span className="text-gray-600 text-lg">Reservation Fee:</span>
                  <span className="text-blue-800/90 font-bold text-2xl md:text-4xl">${estimatedPrice} USD</span>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg mt-4">
                  <span className="text-black font-semibold text-md">Fee Terms: </span> <span className="text-gray-500 text-sm">Your test-drive reservation fee may be credited toward an eligible vehicle purchase, subject to the applicable purchase terms.</span>
                </div>
                <span className="text-xs text-gray-600/80 tracking-wide mt-5">Your reservation fee will be charged through the approved payment process outlined in our confirmation.</span>
              </div>

              <div className=" bg-amber-100/50 p-4 rounded-xl border border-amber-500/20">
                <div>
                  <span className="text-md font-semibold text-amber-900/90">Note:</span>
                  <span className="text-sm text-amber-900/50"> You must be signed in to your account to submit a test-drive request.
                  </span>
                </div>
                <a href="/account" className="text-md font-semibold text-amber-900/90 underline"> Sign in now</a>
              </div>
            </div>


            <button disabled={loading} type="submit" className="w-full mt-8 py-4 mx-auto text-gray-100 font-bold text-lg rounded-md bg-blue-800 hover:bg-blue-800/90  border-none transition-all duration-300 ">Submit Test Drive Request</button>
            <span className="text-xs text-gray-600/60 tracking-wide px-12 mt-3">By submitting, you agree to receive contact from our team regarding your test-drive appointment and payment processing.</span>
          </form>

        </div>
      </section>

    </div>
  )
}