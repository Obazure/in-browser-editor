import useFileContentManager from '../../hooks/useFileContentManager'
import { mockInitedFileSystem } from '../../testUtils/mockData'
import { initialStoredFileSystem } from '../../utils/fileSystem'
import addFileSystemElement from './addFileSystemElement'
import changeNameFileSystemElement from './changeNameFileSystemElement'
import collectFilesSystemToStorage from './collectFileSystemToStorage'
import convertStorageToFileSystem from './convertStorageToFileSystem'
import deleteFileSystemElement from './deleteFileSystemElement'

describe('helpers/FileSystem', () => {
    let contentManager = useFileContentManager()

    beforeEach(() => {
        contentManager = useFileContentManager()
    })
    it('should addFileSystemElement', () => {
        const newFile = { name: 'some-file-name' }
        const nextFileSystem = addFileSystemElement(
            contentManager,
            mockInitedFileSystem,
            newFile,
            '/src/'
        )
        const result = {
            children: [{ extension: 'file', name: 'some-file-name', path: '/src/' }],
            extension: 'folder',
            name: 'src',
            path: '/',
        }
        expect(nextFileSystem.children[2]).toEqual(result)
    })
    it('should changeNameFileSystemElement', () => {
        const nextFileSystem = changeNameFileSystemElement(
            contentManager,
            mockInitedFileSystem,
            mockInitedFileSystem.children[0],
            'web-sources'
        )
        expect(nextFileSystem.children[0]).toEqual({
            children: [{ extension: 'html', name: 'index.html', path: '/public/' }],
            extension: 'folder',
            name: 'public',
            path: '/',
        })
    })
    it('should collectFilesSystemToStorage', () => {
        const forStorage = collectFilesSystemToStorage(mockInitedFileSystem)
        expect(forStorage).toEqual(initialStoredFileSystem)
    })
    it('should convertStorageToFileSystem', () => {
        const fromStore = convertStorageToFileSystem(contentManager, initialStoredFileSystem)
        expect(fromStore).toEqual(mockInitedFileSystem)
    })
    it('should deleteFileSystemElement', () => {
        const nextFileSystem = deleteFileSystemElement(
            contentManager,
            mockInitedFileSystem,
            mockInitedFileSystem.children[0].children[0]
        )
        expect(nextFileSystem).toEqual({
            children: [
                {
                    children: [
                        {
                            extension: 'js',
                            name: 'index.js',
                            path: '/assets/',
                        },
                    ],
                    extension: 'folder',
                    name: 'assets',
                    path: '/',
                },
                {
                    children: [
                        {
                            extension: 'html',
                            name: 'index.html',
                            path: '/public/',
                        },
                    ],
                    extension: 'folder',
                    name: 'public',
                    path: '/',
                },
                {
                    children: [],
                    extension: 'folder',
                    name: 'src',
                    path: '/',
                },
                {
                    extension: 'json',
                    name: 'package.json',
                    path: '/',
                },
            ],
            extension: 'folder',
            name: 'Project',
            path: '',
        })
    })
})
