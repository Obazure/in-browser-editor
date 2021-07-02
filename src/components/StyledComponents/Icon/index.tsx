import React, { FC, memo } from 'react'
import { Color, IconTypes } from '../../../@types/style'

type Props = {
    type?: IconTypes
    color?: Color
    hint?: string
    onPress?: () => void
}

const Icon: FC<Props> = ({ type, color = Color.TEXT, hint, onPress }) => {
    const componentProps = {
        className: `${type} ${color}-text`,
        title: hint,
        onClick: onPress,
    }

    return (
        <div className="icon hover">
            {onPress ? <a {...componentProps} /> : <i {...componentProps} />}
        </div>
    )
}

export default memo(Icon)
