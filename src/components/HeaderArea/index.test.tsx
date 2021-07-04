import React from 'react'
import { shallow } from 'enzyme'
import HeaderArea from '.'

describe('components/HeaderArea/index', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<HeaderArea />)
        expect(wrapper.getElements()).toMatchSnapshot()
    })
})
