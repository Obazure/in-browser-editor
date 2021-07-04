import React from 'react'
import { shallow } from 'enzyme'
import { mockFile, mockFileSystem } from '../../testUtils/mockData'
import NavigationItem from './NavigationItem'
import ManageBar from './ManageBar'
import FilesNavigationArea from '.'

const mockOnSelect = jest.fn()
const mockOnOpen = jest.fn()

jest.mock('../../providers/FilesProvider', () => {
    return {
        useFilesProvider: () => {
            return {
                fileSystem: mockFileSystem,
                selectedElement: mockFile,
                openedFile: null,
                selectFileSystemElement: mockOnSelect,
                openFile: mockOnOpen,
            }
        },
    }
})

describe('components/FilesNavigationArea/ManageBar/index', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should render and handle clicks correctly', () => {
        const wrapper = shallow(<FilesNavigationArea />)
        const manageBar = wrapper.find(ManageBar)
        expect(manageBar).toHaveLength(1)

        const navItem = wrapper.find(NavigationItem)
        expect(navItem).toHaveLength(1)
        expect(navItem.props().item).toEqual(mockFileSystem)
        expect(navItem.props().selectedElement).toEqual(mockFile)
        expect(navItem.props().openedFile).toEqual(null)
        expect(navItem.props().onClick).toBeDefined()
        expect(navItem.props().onDoubleClick).toBeDefined()

        const onClick = navItem.props().onClick
        onClick && onClick(mockFile)
        expect(mockOnSelect).toHaveBeenCalledTimes(1)
        expect(mockOnSelect).toHaveBeenCalledWith(mockFile)

        const onDoubleClick = navItem.props().onDoubleClick
        onDoubleClick && onDoubleClick(mockFile)
        expect(mockOnSelect).toHaveBeenCalledTimes(2)
        expect(mockOnOpen).toHaveBeenCalledTimes(1)
        expect(mockOnOpen).toHaveBeenCalledWith(mockFile)

        onDoubleClick && onDoubleClick(mockFileSystem)
        expect(mockOnSelect).toHaveBeenCalledTimes(2)
        expect(mockOnOpen).toHaveBeenCalledTimes(1)
    })
})
