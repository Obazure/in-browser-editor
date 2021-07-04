import { clearPersistanceStorage, readPersistanceStorage, writePersistanceStorage } from './local'

const storageKey = 'unit_test'
const message = { hello: 'world' }

describe('helpers/Storage', () => {
    beforeEach(jest.resetAllMocks)

    it('should write into Storage', () => {
        jest.spyOn(Storage.prototype, 'setItem')
        expect(localStorage.setItem).toHaveBeenCalledTimes(0)
        writePersistanceStorage(storageKey, message)
        expect(localStorage.setItem).toHaveBeenCalledWith(storageKey, JSON.stringify(message))
    })

    it('should read from Storage', () => {
        jest.spyOn(Storage.prototype, 'getItem').mockImplementation(
            (key: string) => `{"foo":"${key}"}`
        )
        expect(localStorage.getItem).toHaveBeenCalledTimes(0)
        const storage = readPersistanceStorage(storageKey)
        expect(storage).toBeDefined()
        expect(storage).toEqual({ foo: storageKey })
    })

    it('should clear in Storage', () => {
        jest.spyOn(Storage.prototype, 'removeItem')
        expect(localStorage.removeItem).toHaveBeenCalledTimes(0)
        clearPersistanceStorage(storageKey)
        expect(localStorage.removeItem).toHaveBeenCalledWith(storageKey)
    })
})
