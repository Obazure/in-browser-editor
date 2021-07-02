import React, { FC, memo } from 'react'

type Props = {
    children?: string
    color?: string
}

const Text: FC<Props> = ({ children, color }) => {
    return <span className={`${color}-text`}>{children}</span>
}

export default memo(Text)
