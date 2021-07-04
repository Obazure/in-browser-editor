/* eslint-disable prettier/prettier */
import React from 'react'
import { shallow } from 'enzyme'
import OverlayLayout from './OverlayLayout'

describe('layouts/OverlayLayout', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <OverlayLayout>
                <i>Text</i>
            </OverlayLayout>
        )
        expect(wrapper.getElements()).toMatchSnapshot()
    })
})
