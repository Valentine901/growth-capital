import { useContext, createContext, useState, useEffect, useCallback } from "react";
import {API} from "../../constants/API"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [userData, setUserData] = useState(() => {
        const savedUser = localStorage.getItem("user");
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


    const RefreshToken = useCallback(async () => {
        setLoading(true);
        try {

            const response = await API.post("/tesla-user/refresh-token");

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
            throw error;
        } finally{
            setLoading(false);
        }
    }, [userData])

    const SaveUserData = (data) => {
        localStorage.setItem("user", JSON.stringify(data));
    }

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
            const response = await API.get("/tesla-user/me");
            SaveUserData(response.data);
            setUserData(response.data);
            return response.data;

        } catch (error) {
            handleAxiosError(error, "Failed to authenticate session");
        }finally{
            setLoading(false);
        }
    }, []);

    

    useEffect(() => {
        const responseInterceptor = API.interceptors.response.use(
            // if success, continue smoothly with app
            (response) => response,

            // if error, check and know if token expires
            async (error) => {
                const originalRequest = error.config;
                // copy the original request and check if error is 401 or  user already tried the original request
                if (error.response?.status === 401 && !originalRequest._retry) {
                    // check if user was tryimg to access loginor refresh-token endpint unauthorized
                    if (originalRequest.url.includes("/tesla-user/user-login") || originalRequest.url.includes("/tesla-user/refresh-token")) {
                        // send them normal 401 error not authorized
                        return Promise.reject(error);
                    }
                    // if user haven't tried original request, let them try
                    originalRequest._retry = true;
                    originalRequest.baseURL = API.defaults.baseURL;
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
            API.interceptors.response.eject(responseInterceptor)
        }
    }, [RefreshToken])

    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true);

            const savedUser = localStorage.getItem("user");
            if (!savedUser){
                setLoading(false);
                return;
            }

            try{
                await Promise.all([
                getCurrentUser()
            ]);
            } catch (error) {
                setErrorMessage(error);
            } finally{
                setLoading(false);
            }

    }

    initializeAuth();
    }, [getCurrentUser])



    return (
        <AuthContext.Provider value={{ errorMessage, loading, userData, getCurrentUser }}>
            {children}
        </AuthContext.Provider>
    )

}


export default AuthProvider;
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context;
};


