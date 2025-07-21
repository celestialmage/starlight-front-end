export async function saveTokens ({ data }) {

    console.log(data);

    localStorage.setItem('StarlightAccessToken', data.access_token);
    localStorage.setItem('StarlightRefreshToken', data.refresh_token);
};

