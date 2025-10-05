
import { EventEmitter } from 'events';

// This is a workaround for the fact that the native EventTarget in browser environments
// does not have the same API as the Node.js EventEmitter.
// We use the 'events' package to have a consistent API.
class TypedEventEmitter<T extends { [key: string]: any }> {
  private emitter = new EventEmitter();

  emit<K extends keyof T>(event: K, ...args: T[K] extends any[] ? T[K] : [T[K]]) {
    this.emitter.emit(event as string, ...args);
  }

  on<K extends keyof T>(event: K, listener: (...args: T[K] extends any[] ? T[K] : [T[K]]) => void) {
    this.emitter.on(event as string, listener as (...args: any[]) => void);
  }

  off<K extends keyof T>(event: K, listener: (...args: T[K] extends any[] ? T[K] : [T[K]]) => void) {
    this.emitter.off(event as string, listener as (...args: any[]) => void);
  }
}

interface FirebaseErrorEvents {
  'permission-error': [Error];
}

export const errorEmitter = new TypedEventEmitter<FirebaseErrorEvents>();
