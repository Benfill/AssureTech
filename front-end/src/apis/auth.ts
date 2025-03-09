import axios, { AxiosResponse } from "axios";
import { User } from "../models/User"

const API_URL = import.meta.env.VITE_API_URL;

export const loginHandler = async (email: string, password: string): Promise<AxiosResponse<User | null>> => {
    try {
        const payload = { email, password };
        console.log("Request Payload:", payload);

        const resp = await axios.post(API_URL + "/auth/login", payload);

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

        const resp = await axios.post(API_URL + "/auth/register", payload);

        return resp;
    } catch (error) {
        console.error("Error during register request:", error);
        throw error;
    }
}

export const logoutHandler = async () => {
    try {
        const resp = await axios.post(API_URL + "/auth/logout");

        return resp;
    } catch (error) {
        console.error("Error during logout request:", error);
        throw error;
    }
}