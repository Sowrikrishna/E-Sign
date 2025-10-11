import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const AdminPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Profile of the Centre', path: '/profile' },
        { name: 'Faculty', path: '/faculty' },
        { name: 'Facilities', path: '/facilities' },
        { name: 'Publications', path: '/publications' },
        { name: 'Projects', path: '/projects' },
    ];

    const handleLogout = () => {
        // Add your logout logic here
        console.log('Logout clicked');
    };

    return (
        <header className="bg-white shadow-md">
            {/* Top Section */}
            <div className="bg-blue-800 text-white py-4 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-2xl font-bold mb-2">
                        Centre for Differently Abled Persons (CDAP)
                    </h1>
                    <p className="text-sm">
                        Bharathidasan University, Tiruchirappalli - 620 023
                    </p>
                    <p className="text-sm">Tamil Nadu, India</p>
                </div>
            </div>

            {/* Navigation Section */}
            <nav className="bg-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <div className="flex space-x-4">
                                {navLinks.map((link) => (
                                    <NavLink
                                        key={link.name}
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                            isActive
                                                ? 'bg-blue-600 !text-white'
                                                : '!text-gray-300 hover:bg-blue-700 hover:!text-white'
                                            }`
                                        }
                                        >
                                        {link.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        {/* Logout Button - Desktop */}
                        <div className="hidden md:block">
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                Logout
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {/* Hamburger icon */}
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navLinks.map((link) => (
                                    <NavLink
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `block px-3 py-2 rounded-md text-base font-medium ${isActive
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-300 hover:bg-blue-700 hover:text-white'
                                            }`
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                ))}
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700 text-white mt-2"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default AdminPage;