import { useState, useEffect } from "react";
import { LogInIcon } from "lucide-react";
import { API } from "../../constants/API";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await API.post("/tesla-user/user-login", { email: email, password: password });
            alert("Login success");
        } catch (err) {
            if (err.response) {
                setError(err.response.data.detail);
            } else if (err.request) {
                setError(err.request);
            } else {
                setError("Failed to log in");
            }
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            if(error) {
                setError("");
            }
        }, 3000)
        return () => clearTimeout(timer);
    }, [error])

    return (
        <div className="flex flex-col gap-3 p-6 rounded-lg bg-gray-100/90 max-w-2xl lg:max-w-md mx-auto w-full font-body">
            <div className="flex flex-col gap-2 items-center">
                <div className="bg-blue-400/20 w-20 h-20 flex items-center justify-center rounded-full text-blue-800 mb-4">
                    <LogInIcon size={32} />
                </div>
                <span className="text-black font-bold text-2xl">Sign In</span>
                <span className="text-lg tracking-wider text-gray-600">Access your Tesla Neuralink account</span>
            </div>

            {/* error message section */}
           {error && <div className="my-4 p-3 rounded-md bg-red-500/15 duration-300 transition-all">
                <span className="text-red-600 text-lg text-center">{error}</span>
            </div>}

            <form onSubmit={handleSubmit} 
                className="flex flex-col gap-4 w-full mt-10">
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-lg">
                        Email Address
                    </label>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required placeholder="your@gmail.com" className="w-full px-4 py-3 rounded-lg border border-gray-300 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400" />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-lg">
                        Password
                    </label>
                    <input type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••" className="w-full px-4 py-3 rounded-lg border border-gray-300 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   placeholder-gray-600/50 placeholder:text-2xl placeholder:tracking-[0.3em]"
                    />
                </div>
                <button disabled={loading} className="w-full py-3 rounded-md bg-blue-800 hover:bg-blue-800/90 transition-all duration-300 text-gray-100 font-bold text-center text-lg">
                    {loading ? "Signing..." : "Sign In"}
                </button>
            </form>
        </div>
    )
}

export default Login