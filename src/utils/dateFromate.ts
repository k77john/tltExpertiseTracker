export function formatDateAndTime(dateString: string): string {
    const date = new Date(dateString)

    // Options for formatting
    const optionsDate: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }
    const optionsTime: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }

    // Create date and time formatters
    const dateFormatter = new Intl.DateTimeFormat('en-US', optionsDate)
    const timeFormatter = new Intl.DateTimeFormat('en-US', optionsTime)

    // Format date and time separately
    const formattedDate = dateFormatter.format(date)
    const formattedTime = timeFormatter.format(date)

    // Combine date and time
    return `${formattedDate} at ${formattedTime}`
}
