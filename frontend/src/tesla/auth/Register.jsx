import { useEffect, useState } from "react"
import { UserPlus } from "lucide-react"

// Assuming API is imported from your network configuration file
// import API from "../path-to-api"; 
import { API } from "../../constants/API";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (password !== confirmPassword) {
            setError("Password do not match.");
            setLoading(false);
            return;
        }

        try {
            // Note: Verify that your FastAPI setup includes the "/tesla-user" prefix
            await API.post("/tesla-user/user-register", { email: email, password: password });
            alert("Registration success");
            
            // Optional: Reset form fields on success
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch (err) {
            if (err.response && err.response.data) {
                const backendError = err.response.data.detail;
                
                // If backend returns a raw validation array instead of your custom string
                if (Array.isArray(backendError)) {
                    setError(backendError[0]?.msg || "Validation error");
                } else if (typeof backendError === "string") {
                    setError(backendError); // Catches "Email already existed"
                } else {
                    setError("An unexpected server error occurred.");
                }
            } else if (err.request) {
                setError("No response from server. Please check your network connection.");
            } else {
                setError("Failed to register user");
            }
        } finally {
            setLoading(false);
        }
    }

    // Automatically clears error messages after 3 seconds
    useEffect(() => {
        if (!error) return; // Fixes infinite/unnecessary triggers when error is empty

        const timer = setTimeout(() => {
            setError("");
        }, 3000)
        
        return () => clearTimeout(timer);
    }, [error])

    return (
        <div className="flex flex-col gap-3 p-6 rounded-lg bg-gray-100/90 max-w-2xl lg:max-w-md mx-auto w-full font-body">
            <div className="flex flex-col gap-2 items-center">
                <div className="bg-blue-400/20 w-20 h-20 flex items-center justify-center rounded-full text-blue-800 mb-4">
                    <UserPlus size={32} />
                </div>
                <span className="text-black font-bold text-2xl">Create Account</span>
                <span className="text-lg tracking-wider text-gray-600">Join Tesla Neuralink </span>
            </div>

            {/* Error message section */}
            {error && (
                <div className="my-4 p-3 rounded-md bg-red-500/15 duration-300 transition-all text-center">
                    <span className="text-red-600 text-lg font-medium">{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mt-10">
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-lg">
                        Email Address
                    </label>
                    <input 
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        placeholder="your@gmail.com" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400" 
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-lg">
                        Password
                    </label>
                    <input 
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600/50 placeholder:text-2xl placeholder:tracking-[0.3em]"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="confirmPassword" className="text-lg">
                        Confirm Password
                    </label>
                    <input 
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="••••••" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600/50 placeholder:text-2xl placeholder:tracking-[0.3em]"
                    />
                </div>

                <button 
                    type="submit"
                    disabled={loading} 
                    className="w-full py-3 rounded-md bg-blue-800 hover:bg-blue-800/90 transition-all duration-300 text-gray-100 font-bold text-center text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Registering..." : "Sign Up"}
                </button>
            </form>
        </div>
    )
}

export default Register
