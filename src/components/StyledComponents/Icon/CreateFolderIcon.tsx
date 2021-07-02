import React, { FC, memo } from 'react'
import { IconClickable } from '../../../@types/component'
import { Color, IconTypes } from '../../../@types/style'
import Icon from '.'

const CreateFolderIcon: FC<IconClickable> = ({ onPress }) => {
    return (
        <Icon
            type={IconTypes.CREATE_FOLDER}
            color={Color.CREATE}
            hint="Create folder"
            onPress={onPress}
        />
    )
}

export default memo(CreateFolderIcon)
