// Define a generic type for data
export const getDataFromStorage = <T>(key: string): T | null => {
    try {
        const data = localStorage.getItem(key)
        if (data) return JSON.parse(data) as T // Typecast to T
        return null
    } catch (error) {
        console.error('Error retrieving data from localStorage:', error)
        return null
    }
}

// Store data in localStorage
export const setDataToStorage = <T>(key: string, value: T): boolean => {
    try {
        const data = JSON.stringify(value)
        localStorage.setItem(key, data)
        return true
    } catch (error) {
        console.error('Error saving data to localStorage:', error)
        return false
    }
}

// Remove data from localStorage
export const removeDataFromStorage = (key: string): boolean => {
    try {
        localStorage.removeItem(key)
        return true
    } catch (error) {
        console.error('Error removing data from localStorage:', error)
        return false
    }
}

// Clear all data from localStorage
export const clearStorage = (): boolean => {
    try {
        localStorage.clear()
        return true
    } catch (error) {
        console.error('Error clearing localStorage:', error)
        return false
    }
}
