export function required(value) {
    if (value === '' || value === null || value === undefined || value.length === 0) {
        return 'This field is required'
    }
}
