import React from 'react'
import { shallow } from 'enzyme'
import { mockFile } from '../../testUtils/mockData'
import TextEditorArea from '.'

const mockSetContent = jest.fn()
const mockGetContent = jest.fn()

jest.mock('../../providers/FilesProvider', () => {
    return {
        useFilesProvider: () => {
            return {
                openedFile: jest.fn().mockReturnValueOnce(null).mockReturnValue(mockFile),
                setFileContent: mockSetContent,
                getFileContent: mockGetContent,
            }
        },
    }
})

describe('components/TextEditorArea/index', () => {
    it('should render correctly without OpenedFile', () => {
        const wrapper = shallow(<TextEditorArea />)
        expect(wrapper.getElements()).toMatchSnapshot()
    })

    it('should render correctly with OpenedFile', () => {
        const wrapper = shallow(<TextEditorArea />)
        expect(wrapper.getElements()).toMatchSnapshot()
    })
})
