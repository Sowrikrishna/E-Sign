import React, { createContext, useContext, useState } from 'react'

export const AppContext = createContext();

export const AppContextProvider=({children})=>{
    const [isUser,setIsUser]=useState(false);
    const [isAdmin,setIsAdmin]=useState(false);
    
    // Add font size state
    const [fontSize, setFontSize] = useState('base'); // 'sm', 'base', 'lg'

    // Font size functions
    const increaseFontSize = () => {
        if (fontSize === 'sm') setFontSize('base');
        else if (fontSize === 'base') setFontSize('lg');
    };

    const decreaseFontSize = () => {
        if (fontSize === 'lg') setFontSize('base');
        else if (fontSize === 'base') setFontSize('sm');
    };

    const resetFontSize = () => {
        setFontSize('base');
    };

    //in this use all the variables to export to other components
    const value={
        isUser,setIsUser,
        isAdmin,setIsAdmin,
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize
    };
    
    return <AppContext.Provider value={value}>
        {/* Wrap entire app with font size class */}
        <div className={fontSize === 'sm' ? 'text-sm' : fontSize === 'base' ? 'text-base' : 'text-lg'}>
            {children}
        </div>
    </AppContext.Provider>
}

export const useAppContext=()=>{
    return useContext(AppContext);
}