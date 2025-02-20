import { createContext, useState } from "react";
export const DarkMode = createContext({
    isDarkMode:false,
    setIsDarkMode:()=>{}
});

const DarkModeProvider = ({children}) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    return(
        <DarkMode.Provider value={{isDarkMode,setIsDarkMode}}>
            {children}
        </DarkMode.Provider>
    )
}
export default DarkModeProvider;