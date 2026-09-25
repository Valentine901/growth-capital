
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        "Home",
        "About",
        "Plans",
        "Portfolio",
        "Assurance",
        "Testimonial",
        "Our-Team",
        "Contact",
        "Guide",
    ];

    return (
        <nav className=" z-[9999] bg-black px-4 py-4text-white sm:px-6 fixed w-full mt-8">

            <div className="flex items-center justify-between">

                <div className="flex flex-col leading-none">
                    <h3 className="font-heading text-lg font-semibold">
                        Growth Capital
                    </h3>

                    <span className="mt-1 text-xs text-gray-400">
                        Logo
                    </span>
                </div>

                <div className="hidden items-center gap-7 md:flex capitalize">
                    {navLinks.map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase().replace(" ", "-")}`}
                            className="font-body text-sm transition-all duration-300 hover:text-yellow-400"
                        >
                            {link}
                        </a>
                    ))}
                </div>

                <div className="hidden items-center gap-5 md:flex">
                    <a
                        href="#login"
                        className="font-body text-sm transition-all duration-300 hover:text-yellow-400"
                    >
                        Login
                    </a>

                    <button className="rounded-md bg-yellow-400 px-6 py-2.5 font-body font-bold text-black transition-all duration-300 hover:bg-yellow-200 hover:shadow-sm hover:shadow-yellow-100">
                        Get Started
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="relative z-[10000] flex h-10 w-10 items-center justify-center rounded-md border border-gray-800 text-white transition-all duration-300 hover:border-yellow-400 hover:text-yellow-400 md:hidden"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
                </button>

            </div>

            <div
                className={`absolute left-0 top-full z-[9999] w-full bg-black shadow-xl transition-all duration-300 md:hidden ${
                    isMenuOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0"
                }`}
            >
                <div className="border-t border-gray-800 px-4 pb-4 pt-2 sm:px-6">

                    {navLinks.map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase().replace(" ", "-")}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="block border-b border-gray-900 py-3 font-body text-sm transition-all duration-300 hover:bg-gray-950 hover:pl-2 hover:text-yellow-400"
                        >
                            {link}
                        </a>
                    ))}

                    <div className="mt-4 flex flex-col gap-3">

                        <a
                            href="#login"
                            onClick={() => setIsMenuOpen(false)}
                            className="py-2 font-body text-sm transition-all duration-300 hover:text-yellow-400"
                        >
                            Login
                        </a>

                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="w-full rounded-md bg-yellow-400 px-6 py-3 font-body font-bold text-black transition-all duration-300 hover:bg-yellow-200"
                        >
                            Get Started
                        </button>

                    </div>

                </div>
            </div>

        </nav>
    );
};

export default Navbar;