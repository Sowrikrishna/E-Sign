import React, { createContext, useContext, useState } from 'react'

export const AppContext = createContext();

export const AppContextProvider=({children})=>{
    const [isUser,setIsUser]=useState(false);

    //in this use all the variables to export to other components
    const value={isUser,setIsUser};
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext=()=>{
    return useContext(AppContext);
}


