function ApiCreator(baseUrl) {
    const fetchCreator = (method) => (url, options) => fetch(`http://${baseUrl}/${url}`, {
        method,
        ...options
    }).then(data => data.json())

    return {
        get: fetchCreator('GET'),
        post: fetchCreator('POST'),
        patch: fetchCreator('PATCH'),
        delete: fetchCreator('DELETE'),
        put: fetchCreator('PUT'),
    }
}

const api = ApiCreator('localhost:3000')

export const getCount = () => api.get('count')

export const updateCount = (count) => api.put('count', {
    body: JSON.stringify(count),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})
