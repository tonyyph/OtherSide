import {useNavigation, useRoute} from '@react-navigation/native'
import {useEffect, useRef, useState} from 'react'
import {DeviceEventEmitter} from 'react-native'
import {useMemoFunc} from './useMemoFunc'

export const useRegisterDataCallback = () => {
  const [key, setKey] = useState<number>(Date.now())
  const resolverRef = useRef<(value: any | PromiseLike<any>) => void>()
  const registerDataCallback = useMemoFunc(<T>(customKey?: number) => {
    return new Promise<{data: T; newKey: number}>(resolve => {
      resolverRef.current = resolve
      const eventName = `event.navigation.${customKey ?? key}`
      console.log('event.navigation', eventName)
      const unSub = DeviceEventEmitter.addListener(eventName, eventData => {
        const newKey = new Date().getTime()
        setKey(newKey)
        unSub.remove()
        resolve({newKey, data: eventData})
      })
    })
  })

  return {key, registerDataCallback}
}

type A = SelectKey<NavigationStackParamList, {key?: number}>

export const usePassDataBack = ({
  key,
  shouldAutoClear = true,
  noGoBack,
  goBack: onBack,
}: {
  key?: number
  goBack?: () => void
  shouldAutoClear?: boolean
  noGoBack?: boolean
}) => {
  const {params} = useRoute<ScreenProps<A>['route']>()
  const {goBack} = useNavigation()
  const itemKey = key || params?.key
  const passDataBack = useMemoFunc(<T>(eventData: T) => {
    const eventName = `event.navigation.${itemKey}`
    console.log('passs data back event.navigation', eventName)
    itemKey && DeviceEventEmitter.emit(eventName, eventData)
    if (noGoBack) {
      return
    }
    if (onBack) {
      return onBack()
    }
    goBack()
  })

  useEffect(() => {
    if (shouldAutoClear) {
      return () => {
        DeviceEventEmitter.removeAllListeners(`event.navigation.${itemKey}`)
      }
    }
  }, [itemKey, shouldAutoClear])

  return {passDataBack}
}
