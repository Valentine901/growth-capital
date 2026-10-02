import Navbar from "../components/Navbar";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Footer from "../components/Footer";


const Authentication = () => {
    return (
        <div>
            <Navbar />
            <Account />
            <Footer />
        </div>
    )
}

export default Authentication;



const Account = () => {
    return (
        <section className="w-full min-h-screen pb-12">
            <div className="flex flex-col gap-5 pt-48 items-center text-center">
                <h2 className="text-black font-body font-bold text-5xl lg:text-7xl">My Account</h2>
                <p className="text-xl text-gray-600 px-6">Manage your TESLA NEURALINK account, view your vehicles, track orders, and manage service records.</p>
            </div>

            <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 px-0 lg:px-90">
                {/* login */}
                <Login />

                {/* register */}
               <Register />
            </div>
        </section>
    )
}
