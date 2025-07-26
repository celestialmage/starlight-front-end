export function saveTokens ({ data }) {
    localStorage.setItem('StarlightAccessToken', data.access_token);
    localStorage.setItem('StarlightRefreshToken', data.refresh_token);
};

export const convertToTimezone = (datestring) => {
    const date = new Date(datestring);

    const formatted = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
        hour12: true,
        }).format(date);

    return formatted;
}