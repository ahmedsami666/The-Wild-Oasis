import { createContext, useContext, useEffect } from "react";
import {useLocalStorageState} from '../hooks/useLocalStorageState'

const DarkModeContext = createContext()

function DarkModeProvider ({ children }) {
    const [isDarkMode, setDarkMode] = useLocalStorageState(false, 'isDarkMode')
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode') 
            document.documentElement.classList.remove('light-mode')
        } else {
            document.documentElement.classList.remove('dark-mode') 
            document.documentElement.classList.add('light-mode')
        }
    }, [isDarkMode])
    const toggleDarkMode = () => {
        setDarkMode(mode => !mode)
    }
    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            { children }
        </DarkModeContext.Provider>
    )
}
const useDarkMode = () => {
    const context = useContext(DarkModeContext)
    if (context === undefined) throw new Error('DarkModeConttext was used outside Provider') 
    return context
}
export { DarkModeProvider, useDarkMode }