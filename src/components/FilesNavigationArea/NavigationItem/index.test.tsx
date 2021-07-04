import React from 'react'
import { shallow } from 'enzyme'
import { mockFile, mockFileSystem } from '../../../testUtils/mockData'
import NavigationItem from '.'

describe('components/NavigationItem/index', () => {
    const mockOnClick = jest.fn()
    const mockOnDoubleClick = jest.fn()

    it('should render correctly', () => {
        const wrapper = shallow(
            <NavigationItem
                item={mockFileSystem}
                selectedElement={mockFile}
                openedFile={null}
                onClick={mockOnClick}
                onDoubleClick={mockOnDoubleClick}
            />
        )
        expect(wrapper.getElements()).toMatchSnapshot()
    })
})
