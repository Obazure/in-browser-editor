import React from 'react'
import { shallow } from 'enzyme'
import ElementNameModal from '.'

describe('components/ElementNameModal/index', () => {
    const mockOnClose = jest.fn()
    const mockOnSubmit = jest.fn()

    beforeEach(jest.resetAllMocks)

    it('should render correctly', () => {
        const wrapper = shallow(
            <ElementNameModal
                defaultValue="default string name"
                onClose={mockOnClose}
                onSubmit={mockOnSubmit}
            />
        )
        expect(wrapper.getElements()).toMatchSnapshot()
    })
})
