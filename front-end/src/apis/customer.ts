import axios, { AxiosResponse } from "axios";
import { Client } from "../models/Client";

const API_URL = import.meta.env.VITE_API_URL;

// Create an axios instance with credentials enabled
const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

export const getAllClients = async (): Promise<AxiosResponse<Client[]>> => {
    try {
        const resp = await api.get("/user/customers");
        return resp;
    } catch (error) {
        console.error("Error during get all clients request:", error);
        throw error;
    }
}

export const getClientById = async (id: string): Promise<AxiosResponse<Client>> => {
    try {
        const resp = await api.get(`/user/customers/${id}`);
        return resp;
    } catch (error) {
        console.error("Error during get client by id request:", error);
        throw error;
    }
}

export const createClient = async (client: Client): Promise<AxiosResponse<Client>> => {
    try {
        const resp = await api.post("/user/customers", client);
        return resp;
    } catch (error) {
        console.error("Error during create client request:", error);
        throw error;
    }
}