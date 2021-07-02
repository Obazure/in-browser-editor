import React, { FC, memo } from 'react'
import Text from '../StyledComponents/Text'

const StatusArea: FC = () => {
    return (
        <div className="status-area">
            <div>
                <Text>In Browser Code Editor (Anonymous user)</Text>
            </div>
        </div>
    )
}

export default memo(StatusArea)
