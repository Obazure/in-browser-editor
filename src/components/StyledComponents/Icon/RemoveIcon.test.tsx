import React from 'react'
import { shallow } from 'enzyme'
import { Color, IconTypes } from '../../../@types/style'
import RemoveIcon from './RemoveIcon'
import Icon from '.'

describe('components/StyledComponents/Icon/CreateFolderIcon', () => {
    it('should render correctly', () => {
        const mockOnPress = jest.fn()
        const wrapper = shallow(<RemoveIcon onPress={mockOnPress} />)

        const icon = wrapper.find(Icon)
        expect(icon).toHaveLength(1)
        expect(icon.props().type).toEqual(IconTypes.REMOVE)
        expect(icon.props().color).toEqual(Color.REMOVE)
        expect(icon.props().hint).toEqual('Remove selected')
        expect(icon.props().onPress).toBe(mockOnPress)

        const onPress = icon.props().onPress
        onPress && onPress()
        expect(mockOnPress).toHaveBeenCalledTimes(1)
    })
})
