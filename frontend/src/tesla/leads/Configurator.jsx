import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PaymentMethod } from '../components/Enum';

import premium_electric_sudan from "../../assets/tesla-images/premium_electric_sudan.jpg";
import premium_electric_suv from "../../assets/tesla-images/premium_electric_suv.jpg";
import sports_car_gt from "../../assets/tesla-images/sports_car_gt.jpg";

import ProtectedRoute from '../auth/ProtectedRoute';
import { API } from '../../constants/API';

// 1. DATA
const CONFIG_OPTIONS = {
  models: [
    { id: 'm1', name: 'TESLA NEURALINK V1', price: 23300, image: premium_electric_sudan, description: 'Premium Electric Sedan' },
    { id: 'm2', name: 'TESLA NEURALINK X', price: 28500, image: premium_electric_suv, description: 'Premium Electric SUV' },
    { id: 'm3', name: 'TESLA NEURALINK GT', price: 35000, image: sports_car_gt, description: 'Advanced Futuristic Electric Truck' },
  ],

  exterior_colors: [
    { id: 'c1', name: 'Pearl White Multi Coat', price: 0, hex: '#f5f5f2' },
    { id: 'c2', name: 'Solid Black', price: 1000, hex: '#111111' },
    { id: 'c3', name: 'Deep Blue Metallic', price: 1000, hex: '#1e3a8a' },
    { id: 'c4', name: 'Midnight Silver Metallic', price: 1000, hex: '#9ca3af' },
    { id: 'c5', name: 'Quantum Gray', price: 1500, hex: '#4b5563' },
    { id: 'c6', name: 'Red Multi Coat', price: 2000, hex: '#b91c1c' },
  ],

  interior_colors: [
    { id: 'i1', name: 'All Black', price: 0, title: 'Premium black interior with matte finishes' },
    { id: 'i2', name: 'Black and White', price: 1000, title: 'Premium black and white interior' },
    { id: 'i3', name: 'Premium Tan', price: 1500, title: 'Warm tan interior with premium materials' },
  ],

  wheels: [
    { id: 'w1', name: '19" Aero Wheels', price: 0, title: 'Aerodynamic design for maximum efficiency' },
    { id: 'w2', name: '20" Cyber Wheels', price: 1500, title: 'Performance-oriented design' },
    { id: 'w3', name: '21" Performance Wheels', price: 2500, title: 'Ultimate performance and style' },
    { id: 'w4', name: '22" Turbine Wheels', price: 2500, title: 'Bold turbine design (GT exclusive)', onlyFor: 'm3' },
  ],

  additionalPackages: [
    { id: 'p1', title: 'Premium Interior Package', desc: 'Enhanced materials and finishes', price: 2000 },
    { id: 'p2', title: 'Enhanced Autopilot', desc: 'Advanced driver assistance features', price: 3500 },
    { id: 'p3', title: 'Full Self-Driving Capability', desc: 'Complete autonomous driving features', price: 8000 },
    { id: 'p4', title: 'Cold Weather Package', desc: 'Heated seats, steering wheel, and wipers', price: 1200 },
    { id: 'p5', title: 'Towing Package', desc: 'Enhanced towing capability (X model)', price: 1000, onlyFor: 'm2' },
    { id: 'p6', title: 'Track Package', desc: 'Track-focused upgrades (GT model)', price: 5000, onlyFor: 'm3' },
  ],
};

const STEPS = ['Model', 'Exterior', 'Interior', 'Wheels', 'Packages', 'Summary'];
const LAST_STEP = STEPS.length;

const fmt = (n) => `$${n.toLocaleString()}`;
const priceLabel = (price, free = 'Included') => (price === 0 ? free : `+${fmt(price)}`);

// 2. REUSABLE OPTION CARD
const OptionCard = ({ selected, onClick, children }) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onClick())}
    className={`p-5 border rounded-xl cursor-pointer transition-all duration-200 ${selected
      ? 'border-blue-600 ring-2 ring-blue-100 bg-blue-50/20'
      : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
  >
    {children}
  </div>
);

const SummaryRow = ({ label, value }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100">
    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</span>
    <p className="text-gray-900 font-medium mt-1">{value}</p>
  </div>
);

// 3. MAIN WORKSPACE COMPONENT
const Main = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentData, setPaymentData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [selections, setSelections] = useState({
    model: null,
    color: null,
    interior: null,
    wheel: null,
    packages: [],
  });

  const calculateTotal = () => {
    const { model, color, interior, wheel, packages } = selections;
    return (
      (model?.price ?? 0) +
      (color?.price ?? 0) +
      (interior?.price ?? 0) +
      (wheel?.price ?? 0) +
      packages.reduce((sum, p) => sum + p.price, 0)
    );
  };

  const handleSelect = (type, item) => {
    setError('');
    setSaved(false);
    setSelections((prev) => {
      const next = { ...prev, [type]: item };
      // Changing model can invalidate model-exclusive wheels and packages
      if (type === 'model') {
        if (next.wheel?.onlyFor && next.wheel.onlyFor !== item.id) next.wheel = null;
        next.packages = next.packages.filter((p) => !p.onlyFor || p.onlyFor === item.id);
      }
      return next;
    });
  };

  const togglePackage = (pkg) => {
    setSaved(false);
    setSelections((prev) => {
      const exists = prev.packages.some((p) => p.id === pkg.id);
      return {
        ...prev,
        packages: exists ? prev.packages.filter((p) => p.id !== pkg.id) : [...prev.packages, pkg],
      };
    });
  };

  const nextStep = () => {
    if (currentStep === 1 && !selections.model) return setError('Select a vehicle model to continue.');
    if (currentStep === 2 && !selections.color) return setError('Select an exterior color to continue.');
    if (currentStep === 3 && !selections.interior) return setError('Select an interior to continue.');
    if (currentStep === 4 && !selections.wheel) return setError('Select a wheel package to continue.');
    setError('');
    setCurrentStep((prev) => Math.min(prev + 1, LAST_STEP));
  };

  const prevStep = () => {
    setError('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const saveConfigurationToDatabase = async () => {
    if (!paymentMethod) {
      setError('Select a payment method to continue.');
      return;
    }

    const payload = {
      model: selections.model.name,
      exterior_color: selections.color.name,
      interior_color: selections.interior.name,
      wheel: selections.wheel.name,
      packages: selections.packages.map((p) => p.title).join(', ') || 'None',
      estimated_total: calculateTotal(),
      crypto_currency: paymentMethod,
    };

    setSaving(true);
    setError('');
    try {
      const response = await API.post('/configure/configure-car', payload);
      setPaymentData(response.data);
      localStorage.setItem('Configure-payment-data', JSON.stringify(response.data));
      setSaved(true);
    } catch (err) {
      console.error('Error saving configuration to database:', err);
      const detail = err.response?.data?.detail;
      setError(typeof detail === 'string' ? detail : 'Could not complete your purchase. Check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = async () => {
    if (!paymentData?.generated_crypto_address) return;
    try {
      await navigator.clipboard.writeText(paymentData.generated_crypto_address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
      setError('Could not copy automatically. Select the address and copy it manually.');
    }
  };
  const restart = () => {
    setSelections({ model: null, color: null, interior: null, wheel: null, packages: [] });
    setPaymentMethod('');
    setPaymentData(null);
    setCopied(false);
    setCurrentStep(1);
    setSaved(false);
    setError('');
  };

  const progressWidth = `${(currentStep / LAST_STEP) * 100}%`;
  const availableWheels = CONFIG_OPTIONS.wheels.filter((w) => !w.onlyFor || w.onlyFor === selections.model?.id);
  const availablePackages = CONFIG_OPTIONS.additionalPackages.filter((p) => !p.onlyFor || p.onlyFor === selections.model?.id);



  return (
    <div className="flex-grow pt-28 pb-10 px-4 max-w-3xl w-full mx-auto">
      {/* HEADER WITH LIVE PRICE */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight my-2">Build Your TESLA NEURALINK</h1>
        <p className="text-gray-500 text-base max-w-xl mx-auto">
          Design your perfect vehicle. Configure model, colors, interior, wheels, and technology packages.
        </p>

        <div className="mt-6 flex gap-4 items-center border border-blue-800 rounded-lg p-6 justify-between">
          <div className="text-left">
            <span className="block text-xs uppercase tracking-wider text-gray-400 font-semibold">Estimated Price</span>
            <h2 className="text-3xl font-extrabold text-blue-800 mt-1">{fmt(calculateTotal())}</h2>
          </div>
          <span className="text-sm text-gray-500">{selections.model ? selections.model.name : 'No model selected'}</span>
        </div>

        <div className="w-full bg-gray-200 h-1 rounded-full mt-4 overflow-hidden">
          <div className="bg-blue-600 h-full transition-all duration-300 ease-out" style={{ width: progressWidth }} />
        </div>
        <p className="text-xs font-medium text-gray-400 mt-2">
          Step {currentStep} of {LAST_STEP}: {STEPS[currentStep - 1]}
        </p>
      </div>

      {/* STEP 1: MODEL */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Select Your Model</h3>
          {CONFIG_OPTIONS.models.map((model) => (
            <div
              key={model.id}
              role="button"
              tabIndex={0}
              onClick={() => handleSelect('model', model)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), handleSelect('model', model))}
              className={`flex items-center p-5 rounded-lg cursor-pointer transition-all duration-200 border ${selections.model?.id === model.id
                ? 'border-blue-600 ring-1 ring-blue-800 bg-blue-50/20'
                : 'border-gray-200 hover:border-blue-800 bg-white'
                }`}
            >
              <div className="w-44 h-20 bg-gray-100 rounded-lg mr-5 shrink-0">
                <img src={model.image} alt={model.name} className="w-full h-full object-cover rounded-lg" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{model.name}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{model.description}</p>
                <p className="text-lg font-bold text-blue-800 tracking-wider mt-2">{fmt(model.price)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* STEP 2: EXTERIOR COLOR */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Select Your Paint Color</h3>
          {CONFIG_OPTIONS.exterior_colors.map((color) => (
            <OptionCard key={color.id} selected={selections.color?.id === color.id} onClick={() => handleSelect('color', color)}>
              <div className="flex items-center gap-4">
                <span
                  className="w-8 h-8 rounded-full border border-gray-300 shrink-0"
                  style={{ backgroundColor: color.hex }}
                  aria-hidden="true"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{color.name}</h4>
                  <p className="text-sm text-gray-500 mt-0.5">{priceLabel(color.price, 'Included in base price')}</p>
                </div>
              </div>
            </OptionCard>
          ))}
        </div>
      )}

      {/* STEP 3: INTERIOR */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Select Your Interior</h3>
          {CONFIG_OPTIONS.interior_colors.map((item) => (
            <OptionCard key={item.id} selected={selections.interior?.id === item.id} onClick={() => handleSelect('interior', item)}>
              <h4 className="font-bold text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-500 mt-1">{item.title}</p>
              <p className="text-sm font-semibold text-blue-800 mt-2">{priceLabel(item.price)}</p>
            </OptionCard>
          ))}
        </div>
      )}

      {/* STEP 4: WHEELS */}
      {currentStep === 4 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Select Your Wheel Upgrade</h3>
          {availableWheels.map((wheel) => (
            <OptionCard key={wheel.id} selected={selections.wheel?.id === wheel.id} onClick={() => handleSelect('wheel', wheel)}>
              <h4 className="font-bold text-gray-900">{wheel.name}</h4>
              <p className="text-sm text-gray-500 mt-1">{wheel.title}</p>
              <p className="text-sm font-semibold text-blue-800 mt-2">{priceLabel(wheel.price)}</p>
            </OptionCard>
          ))}
        </div>
      )}

      {/* STEP 5: ADDITIONAL PACKAGES (optional, multi-select) */}
      {currentStep === 5 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">Add Packages</h3>
          <p className="text-sm text-gray-500 mb-2">Optional. Select as many as you like.</p>
          {availablePackages.map((pkg) => {
            const checked = selections.packages.some((p) => p.id === pkg.id);
            return (
              <OptionCard key={pkg.id} selected={checked} onClick={() => togglePackage(pkg)}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-gray-900">{pkg.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{pkg.desc}</p>
                    <p className="text-sm font-semibold text-blue-800 mt-2">+{fmt(pkg.price)}</p>
                  </div>
                  <input type="checkbox" checked={checked} readOnly className="mt-1 h-5 w-5 accent-blue-600 pointer-events-none" tabIndex={-1} />
                </div>
              </OptionCard>
            );
          })}
        </div>
      )}

      {/* STEP 6: SUMMARY + PAYMENT */}
      {currentStep === 6 && (
        <div className="border border-gray-200 p-6 md:p-8 rounded-2xl bg-gray-50/50 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 pb-3 border-b border-gray-200 mb-6">Your Configuration Summary</h3>

          <div className="space-y-4">
            <SummaryRow label="Model" value={`${selections.model?.name} — ${fmt(selections.model?.price ?? 0)}`} />
            <SummaryRow label="Exterior Finish" value={`${selections.color?.name} (${priceLabel(selections.color?.price ?? 0)})`} />
            <SummaryRow label="Interior" value={`${selections.interior?.name} (${priceLabel(selections.interior?.price ?? 0)})`} />
            <SummaryRow label="Wheel Package" value={`${selections.wheel?.name} (${priceLabel(selections.wheel?.price ?? 0)})`} />
            <div className="bg-white p-4 rounded-xl border border-gray-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Additional Packages</span>
              {selections.packages.length === 0 ? (
                <p className="text-gray-500 mt-1">None selected</p>
              ) : (
                <ul className="mt-1 space-y-1">
                  {selections.packages.map((p) => (
                    <li key={p.id} className="text-gray-900 font-medium">
                      {p.title} (+{fmt(p.price)})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between items-start border-t border-gray-200 mt-6 pt-6 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Final Calculated Price</span>
              <h2 className="text-3xl font-extrabold text-blue-800 mt-0.5">{fmt(calculateTotal())}</h2>
            </div>

            {/* PAYMENT METHOD */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="paymentMethod" className="text-sm font-semibold text-gray-700">
                Payment Method*
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                required
                value={paymentMethod}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setError('');
                }}
                disabled={saving || saved}
                className="w-full px-3 py-3 bg-gray-200 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="" disabled>Select a payment method</option>
                {Object.values(PaymentMethod).map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={saveConfigurationToDatabase}
              disabled={saving || saved}
              className="w-full px-6 py-3 bg-blue-800 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold rounded-md shadow-md shadow-blue-200 transition-colors cursor-pointer"
            >
              {saving ? 'Purchase in progress...' : saved ? 'Purchased' : 'Purchase'}
            </button>
          </div>

          {saved && paymentData && (
            <div className="mt-4 border border-green-200 bg-green-50 rounded-lg p-4 text-sm text-green-800">
              <p className="font-semibold">Purchase created. Send the exact amount below to complete your payment.</p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-green-700">Exact amount</span>
                <span className="font-bold text-gray-900">
                  {paymentData.exact_crypto_amount} {paymentData.crypto_ticker}
                </span>
              </div>

              <div className="mt-3">
                <span className="block text-green-700 mb-1">Payment address</span>
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-3">
                  <code className="text-xs text-gray-700 font-mono break-all flex-grow select-all">
                    {paymentData.generated_crypto_address}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="text-xs font-semibold bg-white border border-gray-300 text-gray-600 hover:text-blue-700 hover:border-blue-700 px-3 py-1.5 rounded-md transition-all active:scale-95 cursor-pointer"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <p className="mt-3 text-xs text-green-700">
                Your configuration is confirmed automatically once the transaction is detected on the blockchain.
              </p>

              <button onClick={restart} className="mt-3 font-semibold underline cursor-pointer">
                Start a new build
              </button>
            </div>
          )}
        </div>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <p role="alert" className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </p>
      )}

      {/* STEP NAVIGATION */}
      <div className="mt-8 flex justify-between items-center border-t border-gray-100 pt-6">
        {currentStep > 1 && (
          <button
            onClick={prevStep}
            className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors cursor-pointer"
          >
            Back
          </button>
        )}
        {currentStep < LAST_STEP && (
          <button
            onClick={nextStep}
            className={`px-5 py-2.5 w-full bg-blue-800 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer ${currentStep > 1 ? 'ml-2' : ''
              }`}
          >
            {currentStep === LAST_STEP - 1 ? 'Review Build' : 'Next'}
          </button>
        )}
      </div>
    </div>
  );
};

// 4. PAGE
const Configurator = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Navbar />
    <Main />
    <Footer />
  </div>
);

export default Configurator;