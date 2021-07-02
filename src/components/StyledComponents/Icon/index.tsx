import React, { FC, memo, useCallback, useMemo } from 'react'
import { Color, IconTypes } from '../../../@types/style'

type Props = {
    type?: IconTypes
    color?: Color
    hint?: string
    onPress?: () => void
}

const Icon: FC<Props> = ({ type, color = Color.TEXT, hint, onPress }) => {
    const onClick = useCallback(() => {
        onPress && onPress()
    }, [onPress])

    const componentProps = useMemo(
        () => ({
            className: `${type} ${color}-text`,
            title: hint,
            onClick,
        }),
        [color, hint, onClick, type]
    )

    return (
        <div className="icon hover">
            {onPress ? <a {...componentProps} /> : <i {...componentProps} />}
        </div>
    )
}

export default memo(Icon)
