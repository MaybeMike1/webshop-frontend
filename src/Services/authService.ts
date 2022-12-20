import { httpService } from './httpService'
import jwtDecode from 'jwt-decode';
import { UserCredentials } from '../@types/userCredentials';
import { User } from '../@types/User';
import Cookies from 'js-cookie';

const tokenKey = 'token';


function mapCredentials(credentials : UserCredentials) {
    return {
        email: credentials.email,
        password: credentials.password
    }
}

async function login(credentials : UserCredentials) {
    const {data} = await httpService.post('/users/login', mapCredentials(credentials));
    localStorage.setItem(tokenKey, data.token);
    httpService.setJwt(data.token);
    return data.token;
};

async function register(credentials : UserCredentials) {
    const {data} = await httpService.post('/users/register', mapCredentials(credentials));
    localStorage.setItem(tokenKey, data.data);
    return data.data;
}

function logout() {
    localStorage.removeItem(tokenKey);
};

function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt ?? '');
    } catch (ex) {
        return null;
    }
};

function getJwt() {
    const jwt = Cookies.get("token")?.split(" ")[1];
    if(jwt === 'undefined') return null;
    return jwt;
}


export const userService = {
    login,
    logout,
    getCurrentUser,
    getJwt,
    register
}
