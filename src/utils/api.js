import axios from 'axios';
import { saveTokens } from './utility';
import { jwtDecode } from 'jwt-decode';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const getAuthHeaders = () => {
    return {
        "headers": {
            Authorization: `Bearer ${localStorage.getItem('StarlightAccessToken')}`,
            'Content-Type': 'application/json'
        }
    }
}

export const createPost = () => {

    const now = new Date();
    const timestamp = now.getTime();

    const headers = getAuthHeaders();

    const post = {
        text: `hey guys it's ${timestamp}`
    };

    axios.post(`${backendUrl}/posts`, post, headers).then(console.log)
}

export const fetchTimeline = async () => {
    return axios.get(`${backendUrl}/posts/timeline`, getAuthHeaders()).then(response => response.data.posts);

}

const createNewUser = (googleToken) => {
    const user = jwtDecode(googleToken);
    const headers = getAuthHeaders()

    console.log(user)

    const userData = {
        email: user.email,
        id: user.sub,
        username: user.given_name + user.family_name,
        display_name: user.given_name + ' ' + user.family_name,
        bio: `I'm ${user.name}`
    }

    console.log(userData);

    axios.post(`${backendUrl}/users`, userData, headers).then(response => {
        console.log(response.data);
    })
}

export const loginUser = async ({ credential }) => {

    const userToken = credential
    const credentials = {credential: userToken}

    const response = await axios.post(`${backendUrl}/api/login`, credentials);
    saveTokens(response);

    console.log(response)
    console.log(jwtDecode(localStorage.getItem('StarlightAccessToken')));


    if (response.data.user_found === false) {
        createNewUser(userToken);
    }
}

// this function will be used when calling ANY api function that retrieves or posts data
// api_function is a callback function.
export async function fetchWithAuth (url, api_function, options = {}) {
    const refreshUrl = `${backendUrl}/api/refresh`;
    const accessToken = localStorage.getItem('StarlightAccessToken');
    const headers = getAuthHeaders();

    let response = await api_function(refreshUrl, {
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
            localStorage.setItem('StarlightAccessToken', newAccessToken);

            response = await api_function(url, {
                ...options,
                headers: headers
            })
        } else {
            localStorage.removeItem('StarlightAccessToken');
            localStorage.removeItem('StarlightRefreshToken');
            window.location.href = '/login';
        }
    }
};

