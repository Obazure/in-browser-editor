import React from 'react'
import { shallow } from 'enzyme'
import { mockFile } from '../../../testUtils/mockData'
import Item from '.'

describe('components/StyleComponents/Item/index', () => {
    const mockOnClick = jest.fn()
    const mockOnDoubleClick = jest.fn()

    it('should render correctly', () => {
        const wrapper = shallow(
            <Item
                item={mockFile}
                selected={true}
                opened={false}
                onClick={mockOnClick}
                onDoubleClick={mockOnDoubleClick}
            />
        )
        expect(wrapper.getElements()).toMatchSnapshot()
    })
})
