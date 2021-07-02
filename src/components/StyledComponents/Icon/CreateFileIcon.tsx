import React, { FC, memo } from 'react'
import { IconClickable } from '../../../@types/component'
import { Color, IconTypes } from '../../../@types/style'
import Icon from '.'

const CreateFileIcon: FC<IconClickable> = ({ onPress }) => {
    return (
        <Icon
            type={IconTypes.CREATE_FILE}
            color={Color.CREATE}
            hint="Create file"
            onPress={onPress}
        />
    )
}

export default memo(CreateFileIcon)
