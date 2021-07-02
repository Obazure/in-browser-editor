import React, { FC, memo } from 'react'
import { IconClickable } from '../../../@types/component'
import { Color, IconTypes } from '../../../@types/style'
import Icon from '.'

const RemoveIcon: FC<IconClickable> = ({ onPress }) => {
    return (
        <Icon
            type={IconTypes.REMOVE}
            color={Color.REMOVE}
            hint="Remove selected"
            onPress={onPress}
        />
    )
}

export default memo(RemoveIcon)
