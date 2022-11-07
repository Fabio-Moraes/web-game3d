import { useCallback, useEffect, useState } from "react"
import {KeyActionMap} from '../interfaces/KeyActionMap'

function actionByKey(key: string) {
    const keyActionMap: KeyActionMap = {
        KeyW: 'moveForward',
        KeyS: 'moveBackward',
        KeyA: 'moveLeft',
        KeyD: 'moveRight',
        ShiftLeft: 'deleteCube',
        Space: 'jump',
        Digit1: 'dirt',
        Digit2: 'grass',
        Digit3: 'glass',
        Digit4: 'wood',
        Digit5: 'log',
        Digit6: 'fire',    
    }
    
    return keyActionMap[key as keyof typeof keyActionMap];
}

export const useKeyboard = () => {
    //keyboard state
    const [actions, setActions] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        deleteCube: false,
        jump: false,
        dirt: false,
        grass: false,
        glass: false,
        wood: false,
        log: false,
        fire: false
    })

    //enabled
    const handleKeyDown = useCallback((e: { code: string }) => {
        const action = actionByKey(e.code)
        if (action) {
            setActions((prev) => {
                return ({
                    ...prev,
                    [action]: true
                })
            })
        }
    }, [])

    //disabled
    const handleKeyUp = useCallback((e: { code: string }) => {
        const action = actionByKey(e.code)
        if (action) {
            setActions((prev) => {
                return ({
                    ...prev,
                    [action]: false
                })
            })
        }
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [handleKeyDown, handleKeyUp])

    return actions;
}