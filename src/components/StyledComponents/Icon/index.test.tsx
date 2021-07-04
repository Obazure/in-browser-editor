import React from 'react'
import { shallow } from 'enzyme'
import { Color, IconTypes } from '../../../@types/style'
import CreateFileIcon from './CreateFileIcon'
import CreateFolderIcon from './CreateFolderIcon'
import RemoveIcon from './RemoveIcon'
import RenameIcon from './RenameIcon'
import Icon from '.'

const mockOnPress = jest.fn()

describe('components/StyledComponents/Icon/index', () => {
    it('should render simple Icon', () => {
        const wrapper = shallow(
            <Icon type={IconTypes.CREATE_FILE} color={Color.CREATE} hint="Create file" />
        )
        expect(wrapper.getElements()).toMatchSnapshot()
    })

    it('should render Clickable Icon', () => {
        const wrapper = shallow(
            <Icon type={IconTypes.CREATE_FILE} hint="Create file" onPress={mockOnPress} />
        )
        expect(wrapper.getElements()).toMatchSnapshot()
    })

    it('should render CreateFileIcon correctly', () => {
        const wrapper = shallow(<CreateFileIcon onPress={mockOnPress} />)
        expect(wrapper.getElements()).toMatchSnapshot()
    })
    it('should render CreateFolderIcon correctly', () => {
        const wrapper = shallow(<CreateFolderIcon onPress={mockOnPress} />)
        expect(wrapper.getElements()).toMatchSnapshot()
    })
    it('should render RemoveIcon correctly', () => {
        const wrapper = shallow(<RemoveIcon onPress={mockOnPress} />)
        expect(wrapper.getElements()).toMatchSnapshot()
    })
    it('should render RenameIcon correctly', () => {
        const wrapper = shallow(<RenameIcon onPress={mockOnPress} />)
        expect(wrapper.getElements()).toMatchSnapshot()
    })
})
