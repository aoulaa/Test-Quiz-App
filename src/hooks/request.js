import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { auth, signOut } from '../utils/auth'
import baseAxios from '../utils/request'
import { useMessage } from './message'


export function useRequest(options = {}) {
    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
    const [showMessage] = useMessage()

    const history = useHistory()

    async function request(overrideOptions = {}, sync = false) {
        setLoading(true)

        try {
            const { data } = await baseAxios({ ...auth(), ...options, ...overrideOptions })
            if (!sync) setResponse(data)
            return { response: data, success: true }
        } catch (e) {
            setError(e.response || {})
            if (e.response === undefined) {
                showMessage('Please check your internet', 'is-danger')
            } else if (e.response.status >= 500) {
                showMessage('server error.', 'is-danger')
            } else if (e.response.status === 401 && e.response.data.logout) {
                signOut(history)
            }

            return { error: e.response, success: false }
        } finally {
            if (!sync) setLoading(false)
        }
    }

    return { loading, request, error, response, setResponse, setError, setLoading }
}

export function useLoad(options, dependencies = []) {
    const request = useRequest({ method: 'GET', ...options })

    useEffect(() => {
        request.request()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies)

    return request
}
