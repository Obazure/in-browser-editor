import React from 'react'
import { shallow } from 'enzyme'
import { Color, IconTypes } from '../../../@types/style'
import CreateFolderIcon from './CreateFolderIcon'
import Icon from '.'

describe('components/StyledComponents/Icon/CreateFolderIcon', () => {
    it('should render correctly', () => {
        const mockOnPress = jest.fn()
        const wrapper = shallow(<CreateFolderIcon onPress={mockOnPress} />)

        const icon = wrapper.find(Icon)
        expect(icon).toHaveLength(1)
        expect(icon.props().type).toEqual(IconTypes.CREATE_FOLDER)
        expect(icon.props().color).toEqual(Color.CREATE)
        expect(icon.props().hint).toEqual('Create folder')
        expect(icon.props().onPress).toBe(mockOnPress)

        const onPress = icon.props().onPress
        onPress && onPress()
        expect(mockOnPress).toHaveBeenCalledTimes(1)
    })
})