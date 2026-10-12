import { useState, useEffect } from "react";
import { APIInvest } from "../../constants/API";
import { useNavigate } from "react-router-dom";
import { EyeOff, Eye, UserPlus } from "lucide-react";
import { useInvestAuth } from "../context/AuthContext";



const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { SaveUserData } = useInvestAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const response = await APIInvest.post("/investment/user-register", { first_name:firstName, last_name:lastName, email:email, phone:phone, password:password });
            SaveUserData(response.data);
            setSuccess("Account created successfully!");
            setFirstName("");
            setLastName("");
            setPhone("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            setTimeout(() => {
                 // save user details and log them to respective dash
                if (response.data.role === "admin") {
                    navigate("/invest/admin-dashboard");
                }else {
                    navigate("/invest/user-dashboard");
                }
            }, 1500);
        } catch (err) {
            if (err.response?.data?.detail) {
                setError(err.response.data.detail);
            } else if (err.request) {
                setError("No response from server. Check your network.");
            } else {
                setError("Failed to create account");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (error || success) {
                setError("");
                setSuccess("");
            }
        }, 4000);
        return () => clearTimeout(timer);
    }, [error, success]);

    return (
        <div className="flex flex-col lg:flex-row bg-black w-full min-h-screen text-gray-100 font-body items-center justify-center lg:px-16 p-6">

            <div className="hidden lg:flex flex-col items-center justify-center w-1/2 gap-6 p-8">
                <div className="bg-amber-400 text-black w-24 h-24 flex items-center justify-center rounded-2xl shadow-xl shadow-amber-400/10 -rotate-3 hover:rotate-0 transition-transform duration-300">
                    <h1 className="text-6xl font-black tracking-tighter">G</h1>
                </div>

                <div className="flex flex-col gap-2 text-center">
                    <span className="text-amber-400 font-extrabold text-5xl tracking-tight leading-tight">
                        Grow Your Wealth
                    </span>
                    <span className="text-lg font-medium text-gray-400 tracking-wide">
                        Create an account and start investing today
                    </span>
                </div>

                <div className="flex gap-6 items-center mt-6 p-4 bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md">
                    <div className="flex flex-col">
                        <span className="text-gray-400 font-medium text-sm uppercase tracking-wider">Active Portfolio Growth</span>
                        <span className="text-3xl text-amber-400 font-black tracking-tight mt-0.5">+24.8% YoY</span>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="flex flex-col gap-6 p-8 rounded-2xl bg-zinc-950 border border-amber-400/20 shadow-2xl shadow-amber-400/5 max-w-md w-full transition-all duration-300">

                    <div className="flex flex-col items-center gap-4 text-center mt-2">
                        <div className="bg-amber-400/10 border border-amber-400/30 text-amber-400 w-14 h-14 flex items-center justify-center rounded-xl">
                            <UserPlus size={26} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h2 className="text-gray-100 font-bold text-2xl tracking-tight">Create Account</h2>
                            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                                Join over 50,000+ investors around the globe
                            </p>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                            <span className="text-red-400 font-medium text-sm">{error}</span>
                        </div>
                    )}
                    {success && (
                        <div className="p-3.5 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                            <span className="text-green-400 font-medium text-sm">{success}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-semibold tracking-wide text-gray-300">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                placeholder="John"
                                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-amber-400 text-gray-100 placeholder:text-zinc-600 transition-all duration-200"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-semibold tracking-wide text-gray-300">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                placeholder="John"
                                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-amber-400 text-gray-100 placeholder:text-zinc-600 transition-all duration-200"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-semibold tracking-wide text-gray-300">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="your@email.com"
                                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-amber-400 text-gray-100 placeholder:text-zinc-600 transition-all duration-200"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-semibold tracking-wide text-gray-300">
                                Phone
                            </label>
                            <input
                                type="text"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                placeholder="+1(000) 000-0000"
                                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-amber-400 text-gray-100 placeholder:text-zinc-600 transition-all duration-200"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-sm font-semibold tracking-wide text-gray-300">
                                Password
                            </label>
                            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl focus-within:border-amber-400 transition-all duration-200 overflow-hidden pr-4">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-transparent outline-none text-gray-100 placeholder:text-zinc-600"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-zinc-500 hover:text-amber-400 transition-colors duration-200 focus:outline-none"
                                >
                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="confirmPassword" className="text-sm font-semibold tracking-wide text-gray-300">
                                Confirm Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-amber-400 text-gray-100 placeholder:text-zinc-600 transition-all duration-200"
                            />
                        </div>

                        <button
                            disabled={loading}
                            className="w-full py-3.5 mt-2 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-black font-extrabold text-center shadow-lg shadow-amber-400/10"
                        >
                            {loading ? "Registering..." : "Sign Up"}
                        </button>
                    </form>

                    <div className="text-center text-sm text-gray-400 mt-2">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/invest/login")}
                            className="text-amber-400 font-semibold hover:underline bg-transparent border-none outline-none p-0 cursor-pointer"
                        >
                            Sign In
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Register;