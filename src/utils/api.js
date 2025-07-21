import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const headers = {
    Authorization: `Bearer ${localStorage.getItem('StarlightJWT')}`,
    'Content-Type': 'application/json'
}

export async function fetchWithAuth (url, options = {}) {
    const refreshUrl = `${backendUrl}/api/refresh`;
    const accessToken = localStorage.getItem('StarlightAccessToken');

    let response = await fetch(refreshUrl, {
        ...options,
        headers: headers
    })

    if (response.status === 401 && accessToken) {
        const refreshResponse = await fetch('/api/refresh', {
            method: 'POST',
            headers: headers
        });

        if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            const newAccessToken = data.access_token;
            localStorage.setItem('StarlightJWT', newAccessToken);

            response = await fetch(url, {
                ...options,
                headers: headers
            })
        } else {
            localStorage.removeItem('StarlightJWT');
            window.location.href = '/login';
        }
    }
};

