import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const TestDrivePayment = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
};

export default TestDrivePayment;

const Main = () => {
  const savedPaymentData = JSON.parse(localStorage.getItem("payment-data")) || {};
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!savedPaymentData.generated_crypto_address) return;
    
    try {
      await navigator.clipboard.writeText(savedPaymentData.generated_crypto_address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="w-full flex-grow flex justify-center items-center bg-gray-100 px-4 py-16 mt-16">
      <div className="bg-white rounded-2xl p-8 shadow-xl max-w-lg w-full flex flex-col gap-6 border border-gray-200">
        
        {/* Header */}
        <div className="text-center border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Complete Your Payment</h2>
          <p className="text-sm text-gray-500 mt-1">Please send the exact crypto amount to the address below</p>
        </div>

        {/* Details List */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Username</span>
            <span className="text-gray-800 font-semibold">{savedPaymentData.full_name || "N/A"}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Vehicle Model</span>
            <span className="text-gray-800 font-semibold">{savedPaymentData.vehicle_model || "N/A"}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Payment Method</span>
            <span className="text-gray-800 font-bold tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              {savedPaymentData.crypto_ticker || "N/A"}
            </span>
          </div>

          {/* Crypto Amount Box */}
          <div className="flex justify-between items-center text-sm border-t border-b border-gray-100 py-3 my-1">
            <span className="text-gray-500 font-medium">Exact Crypto Amount</span>
            <span className="text-lg font-bold text-gray-900">
              {savedPaymentData.exact_crypto_amount || "0.00"} {savedPaymentData.crypto_ticker}
            </span>
          </div>

          {/* Crypto Address */}
          <div className="flex flex-col gap-2 relative">
            <span className="text-sm text-gray-500 font-medium">Payment Address</span>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3 group hover:border-indigo-400 transition-colors">
              <code className="text-xs text-gray-700 font-mono break-all flex-grow select-all">
                {savedPaymentData.generated_crypto_address || "No address generated"}
              </code>
              <button 
                onClick={handleCopy}
                disabled={!savedPaymentData.generated_crypto_address}
                className="text-xs font-semibold bg-white border border-gray-300 text-gray-600 hover:text-indigo-600 hover:border-indigo-600 px-3 py-1.5 rounded-md transition-all shadow-sm active:scale-95 disabled:opacity-50"
              >
                Copy
              </button>
            </div>
            
            {/* Copied Success Popup Message */}
            {copied && (
              <span className="absolute -top-6 right-0 bg-gray-900 text-white text-xs px-2.5 py-1 rounded-md shadow-md animate-fade-in-down font-medium">
                Copied!
              </span>
            )}
          </div>

          {/* Estimated Total */}
          <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-4 mt-2">
            <span className="text-gray-500 font-medium">Estimated Total (USD)</span>
            <span className="text-4xl font-extrabold text-gray-900">${savedPaymentData.estimated_total || "0.00"}</span>
          </div>
        </div>

        {/* Call to Action Helper Text */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 text-center leading-relaxed mt-2">
          ⚠️ Your booking will be automatically verified once the transaction is detected on the blockchain network.
        </div>

      </div>
    </div>
  );
};
