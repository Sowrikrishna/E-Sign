import React, { createContext, useContext, useState, useEffect } from 'react'

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [isUser, setIsUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    
    // Zoom level state
    const [zoomLevel, setZoomLevel] = useState(1); // 1 = 100%

    // Zoom level functions
    const increaseFontSize = () => {
        setZoomLevel(prev => Math.min(prev + 0.1, 2)); // Max 200%
    };

    const decreaseFontSize = () => {
        setZoomLevel(prev => Math.max(prev - 0.1, 0.5)); // Min 50%
    };

    const resetFontSize = () => {
        setZoomLevel(1);
    };

    // Apply zoom level to the body
    useEffect(() => {
        document.body.style.transform = `scale(${zoomLevel})`;
        document.body.style.transformOrigin = 'top left';
        document.body.style.width = `${100 / zoomLevel}%`;
        document.body.style.height = `${100 / zoomLevel}%`;
        document.body.style.overflowX = 'hidden';
    }, [zoomLevel]);

    const value = {
        isUser, setIsUser,
        isAdmin, setIsAdmin,
        fontSize: zoomLevel, // for backward compatibility, but we are not using it in the Navbar
        increaseFontSize,
        decreaseFontSize,
        resetFontSize
    };
    
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}