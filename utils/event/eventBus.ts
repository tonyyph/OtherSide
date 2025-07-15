import {EventEmitter} from 'events'
import {EventMap} from './typedEventMap'

/**
 * TypedEventBus
 *
 * A strongly-typed event bus built on top of Node.js's `EventEmitter`,
 * enabling publish-subscribe (pub-sub) communication with TypeScript type safety.
 *
 * @template Events - A record of event names mapped to their respective payload types.
 *
 * Features:
 *
 * - `emit(event, payload)`:
 *   Dispatches a typed event with the associated payload to all registered listeners.
 *   - Example:
 *     ```ts
 *     eventBus.emit('language-changed', 'en')
 *     ```
 *
 * - `on(event, handler)`:
 *   Registers a type-safe listener that will be called **every time** the event is emitted.
 *
 *   Use `on` when the event occurs repeatedly and you want to handle it each time it happens.
 *
 *   **Examples:**
 *   - Listening for network connection changes.
 *   - Listening for the `"user-logged-in"` event across multiple screens.
 *   - Listening for global events (e.g., `app-error`, `notification-received`, `theme-changed`, etc.).
 *
 *   You should also use `on` when:
 *   - The listener needs to stay active throughout the lifecycle of a component (or the entire app),
 *     and should not be removed after just one call.
 *   - You are managing the removal of the listener manually using `off()`, which helps prevent memory leaks.
 *
 *   - Example:
 *     ```ts
 *     const handleChange = (lang: string) => console.log('Language:', lang)
 *     eventBus.on('language-changed', handleChange)
 *     ```
 *
 * - `once(event, handler)`:
 *   Registers a listener that is called **only once**, then automatically removed.
 *   Useful when you expect the event to happen just once.
 *   - Example:
 *     ```ts
 *     eventBus.once('select-crypto', asset => {
 *       console.log('Selected asset:', asset.symbol)
 *     })
 *     ```
 *
 * - `off(event, handler)`:
 *   Unsubscribes a specific listener from the given event.
 *   Helps prevent memory leaks or unnecessary event handling.
 *   - Example:
 *     ```ts
 *     eventBus.off('language-changed', handleChange)
 *     ```
 *
 * - `removeAllListeners(event)`:
 *   Removes **all listeners** for a specific event.
 *   Use with caution — it clears everything for that event name.
 *   - Example:
 *     ```ts
 *     eventBus.removeAllListeners('select-crypto')
 *     ```
 *
 * @example
 * // Define events
 * type AppEvents = {
 *   'language-changed': string
 *   'select-crypto': { symbol: string; name: string }
 *   'refresh-wallets': void
 * }
 *
 * // Initialize
 * const eventBus = new TypedEventBus<AppEvents>()
 *
 * // Listen to language change
 * eventBus.on('language-changed', lang => {
 *   console.log('Language changed to:', lang)
 * })
 *
 * // Emit a language change
 * eventBus.emit('language-changed', 'vi')
 */

class TypedEventBus<Events extends Record<string, any>> {
  private emitter = new EventEmitter()

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    this.emitter.emit(event as string, payload)
  }

  on<K extends keyof Events>(event: K, callback: (payload: Events[K]) => void): void {
    this.emitter.on(event as string, callback)
  }

  once<K extends keyof Events>(event: K, callback: (payload: Events[K]) => void): void {
    this.emitter.once(event as string, callback)
  }

  off<K extends keyof Events>(event: K, callback: (payload: Events[K]) => void): void {
    this.emitter.off(event as string, callback)
  }

  removeAllListeners<K extends keyof Events>(event: K): void {
    this.emitter.removeAllListeners(event as string)
  }
}

export const eventBus = new TypedEventBus<EventMap>()
