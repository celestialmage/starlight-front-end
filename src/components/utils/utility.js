export const getAuthHeaders = (token = localStorage.getItem('StarlightAccessToken')) => {
    return {
        "headers": {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
};

export function saveTokens ({ data }) {
    localStorage.setItem('StarlightAccessToken', data.access_token);
    localStorage.setItem('StarlightRefreshToken', data.refresh_token);
};

export const timeAgo = (dateString) => {
    const now = new Date();
    const then = new Date(dateString);
    const diffMs = now - then;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours   = Math.floor(minutes / 60);
    const days    = Math.floor(hours / 24);

    if (days >= 2) {
        // Format as MM/DD/YY
        const mm = then.getMonth() + 1;
        const dd = then.getDate();
        const yy = then.getFullYear().toString().slice(-2);
        return `${mm}/${dd}/${yy}`;
    }

    if (days === 1) {
        return "yesterday";
    }

    if (hours >= 1) {
        return `${hours}h`;
    }

    if (minutes >= 1) {
        return `${minutes}m`;
    }

    return `${seconds}s`;
}
