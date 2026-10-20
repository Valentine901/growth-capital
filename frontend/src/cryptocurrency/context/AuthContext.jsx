import { useContext, createContext, useState, useEffect, useCallback } from "react";
import { APIInvest } from "../../constants/API"

const AuthContext = createContext();

const InvestAuthProvider = ({ children }) => {
    const [plans, setPlans] = useState([])
    const [withdrawals, setWithdrawals] = useState([]);
    const [completedWithdrawals, setCompletedWithdrawals] = useState([]);
    const [wallet, setWallet] = useState(null);
    const [investments, setInvestments] = useState([]);
    const [profits, setProfits] = useState([]);
    const [userData, setUserData] = useState(() => {
        const savedUser = localStorage.getItem("invest_user");
        if (savedUser) {
            try {
                return JSON.parse(savedUser);
            } catch (error) {
                return null;
            }
        } else {
            return null;
        }
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);

    // wallet logic
    const handleFetchUserWallet = async () => {
        setLoading(false);
        try {
            const response = await APIInvest.get("/wallets/user-wallet");
            setWallet(response.data);
        } catch (error) {
            console.log(error.response.data.detail)
        } finally {
            setLoading(false);
        }
    }

    // profit handler
    const handleFetchUserProfits = async () => {
        setLoading(false);
        try {
            const response = await APIInvest.get("/profits/");
            setProfits(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data.detail)
        } finally {
            setLoading(false);
        }
    }

    // investment handler
    const handleFetchUserInvestments = async () => {
        setLoading(false);
        try {
            const response = await APIInvest.get("/transactions/transaction-type");
            setInvestments(response.data);
        } catch (error) {
            console.log(error.response.data.detail)
        } finally {
            setLoading(false);
        }
    }

    // user withdrawal handler
    const handleFetchUserCompletedWithdrawals = async () => {
        setLoading(true);
        setErrorMessage("");
        try {
            const response = await APIInvest.get("/withdrawals/completed")
            console.log(response.data);
            setCompletedWithdrawals(Array.isArray(response.data) ? response.data : []);

        } catch (error) {
            handleAxiosError(error);
        } finally {
            setLoading(false)
        }
    }

    const handleFetchUserWithdrawals = async () => {
        setLoading(true);
        setErrorMessage("");
        try {
            const response = await APIInvest.get("/withdrawals/")
            setWithdrawals(response.data);

        } catch (error) {
            handleAxiosError(error);
        } finally {
            setLoading(false)
        }
    }

    const handleFetchPlans = async () => {
        setLoading(true);
        setErrorMessage("");
        try {
            const response = await APIInvest.get("/plans/")
            setPlans(response.data);
        } catch (error) {
            handleAxiosError(error);
        } finally {
            setLoading(false)
        }
    }

    const RefreshToken = useCallback(async () => {
        setLoading(true);
        try {

            const response = await APIInvest.get("/investment/refresh-token");

            if (userData) {
                const updatedUser = {
                    ...userData,
                    access_token_expires_at: response.data.access_token_expires_at
                };
                SaveUserData(updatedUser);
                setUserData(updatedUser);
            }
            return response.data;
        } catch (error) {
            // setUserData(null);
            // localStorage.removeItem("invest_user")
            throw error;
        } finally {
            setLoading(false);
        }
    }, [])

    const SaveUserData = useCallback((data) => {
        localStorage.setItem("invest_user", JSON.stringify(data));
        setUserData(data);
    }, []);

    const handleAxiosError = (error, fallbackMessage) => {
        if (error.response?.data?.detail) {
            setErrorMessage(error.response.data.detail);
        } else if (error.request) {
            setErrorMessage("No response from server, Check your network")
        } else {
            setErrorMessage(fallbackMessage);
        }
    }

    const getCurrentUser = useCallback(async () => {
        setErrorMessage("");
        setLoading(true);
        try {
            const response = await APIInvest.get("/investment/me");
            setUserData(response.data);
            SaveUserData(response.data);
            console.log(response.data);
            return response.data;

        } catch (error) {
            // setUserData(null)
            // localStorage.removeItem("invest_user");
            handleAxiosError(error, "Failed to authenticate session");
        } finally {
            setLoading(false);
        }
    }, []);


    const logout = async () => {
        try {
            await APIInvest.post("/investment/logout");
            setUserData(null)
            localStorage.removeItem("invest_user")
        } catch (err) {
            console.log(err.response?.data?.detail ?? "Could not reach server")
        }
    }



    useEffect(() => {
        const responseInterceptor = APIInvest.interceptors.response.use(
            // if success, continue smoothly with app
            (response) => response,

            // if error, check and know if token expires
            async (error) => {
                const originalRequest = error.config;
                // copy the original request and check if error is 401 or  user already tried the original request
                if (error.response?.status === 401 && !originalRequest._retry) {
                    // check if user was tryimg to access loginor refresh-token endpint unauthorized
                    if (originalRequest.url.includes("/investment/user-login") || originalRequest.url.includes("/investment/refresh-token")) {
                        // send them normal 401 error not authorized
                        return Promise.reject(error);
                    }
                    // if user haven't tried original request, let them try
                    originalRequest._retry = true;
                    originalRequest.baseURL = APIInvest.defaults.baseURL;
                    try {
                        // create new access toke
                        await RefreshToken();
                        // retry their original request
                        return API(originalRequest);
                    } catch (refreshError) {
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            APIInvest.interceptors.response.eject(responseInterceptor)
        }
    }, [RefreshToken])

    useEffect(() => {getCurrentUser}, [])

    useEffect(() => {
        if(!userData?.id) return;
        handleFetchPlans();
        handleFetchUserWallet();
        handleFetchUserProfits();
        handleFetchUserInvestments();
        handleFetchUserCompletedWithdrawals();
        handleFetchUserWithdrawals();
    }, [userData?.id])



    return (
        <AuthContext.Provider value={{ errorMessage, loading, userData, getCurrentUser, SaveUserData, handleAxiosError, plans, handleFetchPlans, wallet, withdrawals, investments, profits, completedWithdrawals, handleFetchUserCompletedWithdrawals, handleFetchUserProfits, handleFetchUserWallet, handleFetchUserWithdrawals, handleFetchUserInvestments, logout }}>
            {children}
        </AuthContext.Provider>
    )

}


export default InvestAuthProvider;
export const useInvestAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context;
};


