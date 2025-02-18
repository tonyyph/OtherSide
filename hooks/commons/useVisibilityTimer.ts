import {useEffect, useRef} from 'react'

export function useVisibilityTimer(onVisibleForDuration: () => void, duration: number = 3000) {
  const hasTriggered = useRef(false)

  useEffect(() => {
    if (!hasTriggered.current) {
      const timer = setTimeout(() => {
        onVisibleForDuration()
        hasTriggered.current = true
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [onVisibleForDuration, duration])
}
