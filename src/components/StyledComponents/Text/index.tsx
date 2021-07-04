import React, { FC, memo } from 'react'
import { Color } from '../../../@types/style'

type Props = {
    children?: string
    color?: Color
}

const Text: FC<Props> = ({ children, color }) => {
    return <span className={`${color}-text`}>{children}</span>
}

export default memo(Text)
