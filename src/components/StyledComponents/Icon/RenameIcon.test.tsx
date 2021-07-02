import React from 'react'
import { shallow } from 'enzyme'
import { Color, IconTypes } from '../../../@types/style'
import RenameIcon from './RenameIcon'
import Icon from '.'

describe('components/StyledComponents/Icon/RenameIcon', () => {
    it('should render correctly', () => {
        const mockOnPress = jest.fn()
        const wrapper = shallow(<RenameIcon onPress={mockOnPress} />)

        const icon = wrapper.find(Icon)
        expect(icon).toHaveLength(1)
        expect(icon.props().type).toEqual(IconTypes.RENAME)
        expect(icon.props().color).toEqual(Color.RENAME)
        expect(icon.props().hint).toEqual('Rename selected')
        expect(icon.props().onPress).toBe(mockOnPress)

        const onPress = icon.props().onPress
        onPress && onPress()
        expect(mockOnPress).toHaveBeenCalledTimes(1)
    })
})
