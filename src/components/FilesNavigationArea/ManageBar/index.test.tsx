import React from 'react'
import { shallow } from 'enzyme'
import { mockFile } from '../../../testUtils/mockData'
import CreateFileIcon from '../../StyledComponents/Icon/CreateFileIcon'
import CreateFolderIcon from '../../StyledComponents/Icon/CreateFolderIcon'
import RemoveIcon from '../../StyledComponents/Icon/RemoveIcon'
import RenameIcon from '../../StyledComponents/Icon/RenameIcon'
import ManageBar from '.'

const mockCreate = jest.fn()
const mockRename = jest.fn()
const mockRemove = jest.fn()
const mockOpenModal = jest.fn()

jest.mock('../../../providers/FilesProvider', () => {
    return {
        useFilesProvider: () => {
            return {
                selectedElement: mockFile,
                createFileSystemElement: mockCreate,
                renameFileSystemElement: mockRename,
                removeFileSystemElement: mockRemove,
            }
        },
    }
})

jest.mock('../../../hooks/useModal', () => () => [null, mockOpenModal])

describe('component/FileNavigation/ManageBar/index', () => {
    beforeEach(() => {
        jest.resetAllMocks()
        jest.clearAllMocks()
    })

    it('should render correctly', () => {
        const wrapper = shallow(<ManageBar />)
        expect(wrapper.getElements()).toMatchSnapshot()
    })

    it('should create file', () => {
        const wrapper = shallow(<ManageBar />)
        const icon = wrapper.find(CreateFileIcon)
        expect(icon).toHaveLength(1)

        icon.simulate('press')
        expect(mockOpenModal).toHaveBeenCalledTimes(1)
        expect(mockOpenModal.mock.calls[0][1]).toEqual('file')
        mockOpenModal.mock.calls[0][0]('File name is here')
        expect(mockCreate).toHaveBeenCalledWith({ name: 'File name is here' }, '/')
    })
    it('should create folder', () => {
        const wrapper = shallow(<ManageBar />)
        const icon = wrapper.find(CreateFolderIcon)
        expect(icon).toHaveLength(1)
        icon.simulate('press')
        expect(mockOpenModal).toHaveBeenCalledTimes(1)
        expect(mockOpenModal.mock.calls[0][1]).toEqual('folder')
        mockOpenModal.mock.calls[0][0]('File name is here')
        expect(mockCreate).toHaveBeenCalledWith({ children: [], name: 'File name is here' }, '/')
    })
    it('should rename file', () => {
        const wrapper = shallow(<ManageBar />)
        const icon = wrapper.find(RenameIcon)
        expect(icon).toHaveLength(1)
        icon.simulate('press')
        expect(mockOpenModal).toHaveBeenCalledTimes(1)
        expect(mockOpenModal.mock.calls[0][1]).toEqual('file')
        mockOpenModal.mock.calls[0][0]('New file name is here')
        expect(mockRename).toHaveBeenCalledWith(
            { extension: 'file', name: 'file', path: '/' },
            'New file name is here'
        )
    })
    it('should remove file', () => {
        const wrapper = shallow(<ManageBar />)
        const icon = wrapper.find(RemoveIcon)
        expect(icon).toHaveLength(1)
        icon.simulate('press')
        expect(mockRemove).toHaveBeenCalledWith({ extension: 'file', name: 'file', path: '/' })
    })
})
