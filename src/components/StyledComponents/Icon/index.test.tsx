import React from 'react'
import { shallow } from 'enzyme'
import { Color, IconTypes } from '../../../@types/style'
import Icon from '.'

describe('components/StyledComponents/Icon/index', () => {
    it('should render simple Icon', () => {
        const wrapper = shallow(
            <Icon type={IconTypes.CREATE_FILE} color={Color.CREATE} hint="Create file" />
        )

        const container = wrapper.find('div')
        expect(container).toHaveLength(1)
        expect(container.props().className).toEqual('icon hover')

        const icon = container.find('i')
        expect(icon).toHaveLength(1)
        expect(icon.props().className).toEqual('fas fa-file-medical create-text')
        expect(icon.props().title).toEqual('Create file')
        expect(icon.props().onClick).toBeUndefined()
    })

    it('should render Clickable Icon', () => {
        const mockOnPress = jest.fn()
        const wrapper = shallow(
            <Icon
                type={IconTypes.CREATE_FILE}
                color={Color.CREATE}
                hint="Create file"
                onPress={mockOnPress}
            />
        )

        const container = wrapper.find('div')
        expect(container).toHaveLength(1)
        expect(container.props().className).toEqual('icon hover')

        const icon = container.find('a')
        expect(icon).toHaveLength(1)
        expect(icon.props().className).toEqual('fas fa-file-medical create-text')
        expect(icon.props().title).toEqual('Create file')
        expect(icon.props().onClick).toBeDefined()

        icon.simulate('click')
        expect(mockOnPress).toHaveBeenCalledTimes(1)
    })
})
