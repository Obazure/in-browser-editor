/* eslint-disable prettier/prettier */
import React from 'react'
import { shallow } from 'enzyme'
import { Color } from '../../../@types/style'
import Text from '.'

describe('components/StyleComponents/Text/index', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Text
                color={Color.CREATE}
            >Text is here</Text>
        )
        expect(wrapper.getElements()).toMatchSnapshot()
    })
})
