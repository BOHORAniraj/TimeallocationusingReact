import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export const AlertMessage = () => {
    const { status, message, isPending } = useSelector(state => state.task)
    return (
        
            isPending && <Alert
            variant={
                status === "success" ? "success" : "danger"
        }>
        </Alert>
    )
}