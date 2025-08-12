import axios, { AxiosHeaders } from 'axios';
import { saveTokens, getAuthHeaders } from './utility';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const createNewUser = (googleToken, userData) => {
    return axios
    .post(`${backendUrl}/users`, userData, getAuthHeaders())
    .then(response => response)
    .catch(error => error);
}

export const createPost = (postData) => {
    return axios
        .post(`${backendUrl}/posts`, postData, getAuthHeaders())
        .then(response => response['data']['post'])
        .catch(error => error);
}

export const createReply = (replyData) => {
    return axios
        .post(`${backendUrl}/replies/post/${replyData.post_id}`, replyData, getAuthHeaders())
        .then(response => response['data']['reply'])
        .catch(error => error);
}

export const fetchTimeline = () => {
    return axios
        .get(`${backendUrl}/posts/timeline`, getAuthHeaders())
        .then(response => response.data.posts)
        .catch(error => error);

}

export const fetchPostDetails = (options) => {
    return axios
        .get(`${backendUrl}/posts/${options.postId}`, getAuthHeaders())
        .then(response => response.data.post)
        .catch(error => error);
}

export const fetchUserByUsername = ({username}) => {
    return axios
        .get(`${backendUrl}/users/${username}`, getAuthHeaders())
        .then(response => response.data.user)
        .catch(error => error);
}

export const fetchUserByUserId = () => {
    return axios
        .get(`${backendUrl}/users`, getAuthHeaders())
        .then(response => response.data.user)
        .catch(error => error);
}

export const fetchUserBySearch = ({query}) => {
    return axios
        .get(`${backendUrl}/users/search/${query}`,  getAuthHeaders())
        .then(response => response.data.users)
        .catch(error => error);
}

export const followUser = ({userId}) => {
    return axios
        .post(`${backendUrl}/follows/${userId}`, {}, getAuthHeaders())
        .then(response => response.data)
        .catch(error => error);
};

export const unfollowUser = ({ userId }) => {
    return axios
        .delete(`${backendUrl}/follows/${userId}`, getAuthHeaders())
        .catch(error => error);
}

export const likePost = ({postId}) => {
    return axios
        .post(`${backendUrl}/likes/${postId}`, {}, getAuthHeaders());
}

export const unlikePost = ({postId}) => {
    return axios
        .delete(`${backendUrl}/likes/${postId}`, getAuthHeaders());
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

