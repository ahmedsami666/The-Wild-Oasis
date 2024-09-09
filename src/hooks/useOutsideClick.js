import { useEffect, useRef } from "react"

export function useOutsideClick(handler, listneCapturing = true) {
    const ref = useRef()
    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) handler()
        }
        document.addEventListener('click', handleClick, listneCapturing)
        return () => { document.removeEventListener('click', handleClick, listneCapturing) }
    }, [handler, listneCapturing])
    return ref
}