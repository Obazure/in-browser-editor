import { Logger, LogType } from '../Logger/log'

export const writePersistanceStorage = <S>(key: string, value: S): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        Logger('Cannot access localStorage, set up security level in your browser.', LogType.ERROR)
    }
}

export const readPersistanceStorage = <S>(key: string): S | null => {
    let value = localStorage.getItem(key)
    value = value !== 'undefined' ? value : '""'
    return value ? JSON.parse(value) : value
}

export const clearPersistanceStorage = (key: string): void => {
    try {
        localStorage.removeItem(key)
    } catch (error) {
        Logger('Cannot access localStorage, set up security level in your browser.', LogType.ERROR)
    }
}
