import axios, { AxiosHeaders } from 'axios';
import { saveTokens, getAuthHeaders } from './utility';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const createNewUser = (googleToken, userData) => {
    return axios.post(`${backendUrl}/users`, userData, getAuthHeaders()).then(response => response).catch(error => error);
}

export const createPost = (postData) => {
    return axios.post(`${backendUrl}/posts`, postData, getAuthHeaders()).then(response => response['data']['post']).catch(error => error);
}

export const fetchTimeline = () => {
    return axios.get(`${backendUrl}/posts/timeline`, getAuthHeaders()).then(response => response.data.posts).catch(error => error);

}

export const fetchPostDetails = (options) => {
    console.log(options)
    return axios.get(`${backendUrl}/posts/${options.postId}`, getAuthHeaders()).then(response => response.data.post).catch(error => error);
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
    let response = await api_function(options)

    if (response.status === 401 && localStorage.getItem('StarlightRefreshToken')) {
        const refreshUrl = `${backendUrl}/api/refresh`;
        const headers = {
            "headers": {
                Authorization: `Bearer ${localStorage.getItem('StarlightRefreshToken')}`,
                'Content-Type': 'application/json'
            }
        }

        const refreshResponse = await axios.post(refreshUrl, options, headers)
        
        if (refreshResponse.statusText === "OK") {
            const newAccessToken = refreshResponse.data.access_token;
            localStorage.setItem('StarlightAccessToken', newAccessToken);

            console.log('New Refresh Token received.')

            response = await api_function(options)
        } else {
            localStorage.removeItem('StarlightAccessToken');
            localStorage.removeItem('StarlightRefreshToken');
            window.location.href = '/login';
        }
    }

    return response
};

