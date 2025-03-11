import axios, { AxiosResponse } from "axios";
import { User } from "../models/User"

const API_URL = import.meta.env.VITE_API_URL;

// Create an axios instance with credentials enabled
const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

export const loginHandler = async (email: string, password: string): Promise<AxiosResponse<User | null>> => {
    try {
        const payload = { email, password };
        console.log("Request Payload:", payload);

        const resp = await api.post("/auth/login", payload);
        return resp;
    } catch (error) {
        console.error("Error during login request:", error);
        throw error;
    }
};

export const registerHandler = async (name:string, email: string, password: string): Promise<AxiosResponse<User | null>> => {
    try {
        const payload = {firstName: name, email, password };
        console.log("Request Payload:", payload);

        const resp = await api.post("/auth/register", payload);
        return resp;
    } catch (error) {
        console.error("Error during register request:", error);
        throw error;
    }
}

export const logoutHandler = async () => {
    try {
        const resp = await api.post("/auth/logout");
        return resp;
    } catch (error) {
        console.error("Error during logout request:", error);
        throw error;
    }
}

export const getAllUsers = async()=> {
    try {
        const resp = await api.get("/admin/users");
        return resp;
    } catch (error) {
        console.error("Error during fetching users request:", error);
        throw error;
    }
}

export const getAllRoles = async()=> {
    try {
        const resp = await api.get("/admin/users/roles");
        return resp;
    } catch (error) {
        console.error("Error during fetching roles request:", error);
        throw error;
    }
}

export const updateUser  = async (user: User)=> {
    // eslint-disable-next-line prefer-const
    let roles: string[] = [];
    user.roles.map(r => roles!.push(r.name))
    
    try {
        const resp = await api.put("/admin/users/" + user.id + "/roles", {roles});
        return resp;
    } catch (error) {
        console.error("Error during fetching users request:", error);
        throw error;
    }
}