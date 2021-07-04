import {
    clearPersistanceStorage,
    readPersistanceStorage,
    writePersistanceStorage,
} from '../helpers/Storage/local'
import { newFileContent } from '../utils/fileSystem'

export class FileContentManager extends Map {
    get(key: string): string {
        let value: string | undefined | null = super.get(key)
        if (!value) {
            value = readPersistanceStorage<string>(key) || newFileContent()
            writePersistanceStorage(key, value)
            this.set(key, value)
        }
        return value
    }
    set(key: string, value: string): this {
        writePersistanceStorage(key, value)
        super.set(key, value)
        return this
    }
    init(key: string): void {
        let value: string | undefined | null = super.get(key)
        if (!value) {
            value = readPersistanceStorage<string>(key) || newFileContent()
            writePersistanceStorage(key, value)
            this.set(key, value)
        }
    }
    delete(key: string): boolean {
        this.forEach((ignore, itemKey) => {
            if (itemKey.startsWith(key)) {
                clearPersistanceStorage(itemKey)
                super.delete(itemKey)
            }
        })
        return true
    }
    rename(key: string, replacement: string): void {
        this.forEach((ignore, itemKey) => {
            if (itemKey.startsWith(key)) {
                const content = super.get(itemKey)
                const newItemKey = itemKey.replace(key, replacement)
                super.set(newItemKey, content)
                writePersistanceStorage(newItemKey, content)
                super.delete(itemKey)
                clearPersistanceStorage(itemKey)
            }
        })
    }
}

let fileContentManager: FileContentManager | null = null

const useFileContentManager = (): FileContentManager => {
    if (!fileContentManager) {
        fileContentManager = new FileContentManager()
    }
    return fileContentManager
}

export default useFileContentManager
