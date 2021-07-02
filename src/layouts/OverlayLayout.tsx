import React, { FC, memo, ReactElement } from 'react'

type Props = {
    children: ReactElement
}

const OverlayLayout: FC<Props> = ({ children }) => {
    return (
        <div className="overlay">
            <div className="modal">{children}</div>
        </div>
    )
}

export default memo(OverlayLayout)
