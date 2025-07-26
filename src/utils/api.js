import axios, { AxiosHeaders } from 'axios';
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

    return axios.post(`${backendUrl}/posts`, post, headers).then(response => response['data']['post']).catch(error => error)
}

export const fetchTimeline = async () => {
    return axios.get(`${backendUrl}/posts/timeline`, getAuthHeaders()).then(response => response.data.posts).catch(error => error);

}

const createNewUser = (googleToken) => {
    const user = jwtDecode(googleToken);
    const headers = getAuthHeaders()

    const userData = {
        email: user.email,
        id: user.sub,
        username: user.given_name + user.family_name,
        display_name: user.given_name + ' ' + user.family_name,
        bio: `I'm ${user.name}`
    }

    axios.post(`${backendUrl}/users`, userData, headers).then(response => {
        // console.log(response.data);
        "meow" + response;
    })
}

export const loginUser = async ({ credential }) => {

    const userToken = credential
    const credentials = {credential: userToken}

    const response = await axios.post(`${backendUrl}/api/login`, credentials);
    saveTokens(response);

    if (response.data.user_found === false) {
        createNewUser(userToken);
    }
}

// this function will be used when calling ANY api function that retrieves or posts data
// api_function is a callback function.
export async function fetchWithAuth (api_function, options = {}) { 
    let response = await api_function()

    console.log(response);

    if (response.status === 401 && localStorage.getItem('StarlightRefreshToken')) {
        const refreshUrl = `${backendUrl}/api/refresh`;
        const headers = {
            "headers": {
                Authorization: `Bearer ${localStorage.getItem('StarlightRefreshToken')}`,
                'Content-Type': 'application/json'
            }
        }

        const refreshResponse = await axios.post(refreshUrl, {"message": "hey guys"}, headers)
            // .catch(error => error);

        let meow = "meow";

        if (refreshResponse.statusText === "OK") {
            const newAccessToken = refreshResponse.data.access_token;
            localStorage.setItem('StarlightAccessToken', newAccessToken);

            response = await api_function()
        } else {
            localStorage.removeItem('StarlightAccessToken');
            localStorage.removeItem('StarlightRefreshToken');
            window.location.href = '/login';
        }
    }

    return response
};

