import { FileSystemElementExtension, FileType, FolderType } from '../@types/filesSystem'

export const mockFile: FileType = {
    name: 'file',
    extension: FileSystemElementExtension.FILE,
    path: '/',
}

export const mockFileSystem: FolderType = {
    name: 'Project',
    children: [mockFile],
    path: '/',
    extension: FileSystemElementExtension.FOLDER,
}

export const mockInitedFileSystem: FolderType = {
    children: [
        {
            children: [
                {
                    extension: FileSystemElementExtension.CSS,
                    name: 'index.css',
                    path: '/assets/',
                },
                {
                    extension: FileSystemElementExtension.JS,
                    name: 'index.js',
                    path: '/assets/',
                },
            ],
            extension: FileSystemElementExtension.FOLDER,
            name: 'assets',
            path: '/',
        },
        {
            children: [
                {
                    extension: FileSystemElementExtension.HTML,
                    name: 'index.html',
                    path: '/public/',
                },
            ],
            extension: FileSystemElementExtension.FOLDER,
            name: 'public',
            path: '/',
        },
        {
            children: [],
            extension: FileSystemElementExtension.FOLDER,
            name: 'src',
            path: '/',
        },
        {
            extension: FileSystemElementExtension.JSON,
            name: 'package.json',
            path: '/',
        },
    ],
    extension: FileSystemElementExtension.FOLDER,
    name: 'Project',
    path: '',
}

export const mockInitedFilesContents = [
    ['/assets/index.css', '<p>Start typing in this file</p>'],
    ['/assets/index.js', '<p>Start typing in this file</p>'],
    ['/public/index.html', '<p>Start typing in this file</p>'],
    ['/package.json', '<p>Start typing in this file</p>'],
]
