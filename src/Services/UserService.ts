import axios from 'axios';
import { databaseUser } from '../@types/databaseUser';
import { UserCredentials } from '../@types/userCredentials';
import { UpdateUserDto, UserDetail } from '../Pages/ProfilePage';
import {httpService} from './httpService';


export type UpdateUserResponse = {
    result: string;
    data: UserDetail;

}

export const userServices = {
    login : login,
    register : register,
    getUserById : getUserById,
    getAllUsers : getAllUsers,
    deleteById : deleteById,
    updateUser: updateUser,
    updateUserPassword: updateUserPassword
};

async function login(userCredentials : UserCredentials) {
    let something = JSON.stringify(userCredentials);
    const {data} = await httpService.post('http://localhost:8080/api/users/login', {something});
    return data.data;
}

async function register(userCredentials : UserCredentials) {
    const {data} = await httpService.post('http://localhost:8080/api/users/register', {userCredentials});
    return data.data;
}

async function getUserById(id : string | undefined) {
    const {data} = await httpService.get('/users/' + id);
    return data.data as UserDetail;
}

async function updateUser(_id: string | undefined, updatedUser : UpdateUserDto) {
    const {data} = await httpService.put('/users/' + _id, updatedUser);
    return data.data;
}

async function updateUserPassword(passwordBundle : any) {
    const {data} = await httpService.put('/users/reset-password', passwordBundle);
    return data.message;
}

async function getAllUsers(){
    const {data} = await httpService.get('/users');
    return data.data as databaseUser[];
}

async function deleteById(_id : string) {
    const response = await httpService.delete('/users/' + _id);
    return response.data;
}
// Path: src\style\Services\CartService.ts

