
//ignore this file it's not relevant to quizz app
export function auth() {
    return {
        headers: {
            Authorization: localStorage.token ? `Token ${localStorage.token}` : undefined,
        },
    }
}

let permissions

export function checkPermission(permission) {
    if (!permissions) {
        permissions = JSON.parse(localStorage.getItem('permissions'))
    }

    return permissions.includes(permission)
}

export function clearPermissions() {
    permissions = undefined
}

export function signOut(history) {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('permissions')
    clearPermissions()
    history.push('/')
}

