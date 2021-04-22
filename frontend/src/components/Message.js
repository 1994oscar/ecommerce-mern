import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = (variante, children) => {
    return (
        <Alert variante={variante}>
            {children}
        </Alert>
    )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message