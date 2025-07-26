export function saveTokens ({ data }) {
    localStorage.setItem('StarlightAccessToken', data.access_token);
    localStorage.setItem('StarlightRefreshToken', data.refresh_token);
};

