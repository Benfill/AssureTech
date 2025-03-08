import axios, { AxiosResponse } from "axios";
import { Client } from "../models/Client";

const API_URL = "http://CUSTOMER-SERVICE/customers/"

export const getAllClients = async (): Promise<AxiosResponse<Client[]>> => {
    try {
        const resp = await axios.get(API_URL);
        return resp;
    } catch (error) {
        console.error("Error during get all clients request:", error);
        throw error;
    }
}

export const getClientById = async (id: string): Promise<AxiosResponse<Client>> => {
    try {
        const resp = await axios.get(API_URL + id);
        return resp;
    } catch (error) {
        console.error("Error during get client by id request:", error);
        throw error;
    }
}

export const createClient = async (client: Client): Promise<AxiosResponse<Client>> => {
    try {
        const resp = await axios.post(API_URL, client);
        return resp;
    } catch (error) {
        console.error("Error during create client request:", error);
        throw error;
    }
}