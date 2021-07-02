import React, { FC, memo } from 'react'
import { IconClickable } from '../../../@types/component'
import { Color, IconTypes } from '../../../@types/style'
import Icon from '.'

const RenameIcon: FC<IconClickable> = ({ onPress }) => {
    return (
        <Icon
            type={IconTypes.RENAME}
            color={Color.RENAME}
            hint="Rename selected"
            onPress={onPress}
        />
    )
}

export default memo(RenameIcon)
