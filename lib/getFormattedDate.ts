/**
 * Returns a formatted date string.
 * 
 * @param dateString - The date string to be formatted.
 * @returns The formatted date string.
 */
export default function getFormattedDate(dateString: string): string {
    // Create a new Date object using the given date string
    const date = new Date(dateString);

    // Create a new Intl.DateTimeFormat object with the desired options
    const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' });

    // Format the date using the formatter
    const formattedDate = formatter.format(date);

    // Return the formatted date string
    return formattedDate;
}
