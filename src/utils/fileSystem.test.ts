import useFileContentManager from '../hooks/useFileContentManager'
import {
    mockFile,
    mockFileSystem,
    mockInitedFilesContents,
    mockInitedFileSystem,
} from '../testUtils/mockData'
import {
    createFile,
    createFolder,
    findExtension,
    findFileFormat,
    getFullpath,
    initFileStorage,
    newFileContent,
    validateFileName,
} from './fileSystem'

describe('utils/fileSystem', () => {
    it('should newFileContent', () => {
        const content = newFileContent()
        expect(content).toEqual('<p>Start typing in this file</p>')
    })
    it('should createFile', () => {
        const content = createFile('some-name')
        expect(content).toEqual({ name: 'some-name' })
    })
    it('should createFolder', () => {
        const content = createFolder('some-name')
        expect(content).toEqual({
            name: 'some-name',
            children: [],
        })
    })
    it('should findExtention', () => {
        const ext = findExtension('CSS')
        expect(ext).toEqual('css')
    })
    it('should findFileFormat', () => {
        const cssFormat = findFileFormat('style.css')
        expect(cssFormat).toEqual('css')
        const fileFormat = findFileFormat('foo')
        expect(fileFormat).toEqual('file')
    })
    it('should getFullpath', () => {
        const cssFormat = getFullpath(mockFile)
        expect(cssFormat).toEqual('/file')
        const fileFormat = getFullpath(mockFileSystem)
        expect(fileFormat).toEqual('/Project/')
    })
    it('should initFileStorage', () => {
        const contentManager = useFileContentManager()
        const fs = initFileStorage(contentManager)
        expect(fs).toEqual(mockInitedFileSystem)
        expect([...contentManager.entries()]).toEqual(mockInitedFilesContents)
    })
    it('should validateFileName', () => {
        const emptyName = validateFileName('')
        expect(emptyName).toEqual(["Name shouldn't be empty."])
        const forbiddenSymbol = validateFileName('foo/bar')
        expect(forbiddenSymbol).toEqual(['Please do not use "/".'])
    })
})
