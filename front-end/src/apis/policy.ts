import axios, { AxiosResponse } from "axios";
import { Contract } from "../models/Contract";
import { Claim } from "../models/Claim";

const CONTRACTS_URL = "http://localhost:8082/api/";
const CLAIMS_URL = "http://localhost:8082/api/";

// contract
export const getAllContracts = async (): Promise<AxiosResponse<Contract[]>> => {
    try {
        const resp = await axios.get(CONTRACTS_URL);
        return resp;
    } catch (error) {
        console.error("POLICY: CONTRACT, ERROR: {}.", error);
        throw error;
    }
}
export const getAllCustomerContracts = async (id: string): Promise<AxiosResponse<Contract[]>> => {
    try {
        const resp = await axios.get(CONTRACTS_URL + id);
        return resp;
    } catch (error) {
        console.error("POLICY: CONTRACT, ERROR: {}.", error);
        throw error;
    }
}

export const getContractById = async (id: string): Promise<AxiosResponse<Contract>> => {
    try {
        const resp = await axios.get(CONTRACTS_URL + id);
        return resp;
    } catch (error) {
        console.error("POLICY: CONTRACT, ERROR: {}.", error);
        throw error;
    }
}

export const createContract = async (client: Contract): Promise<AxiosResponse<Contract>> => {
    try {
        const resp = await axios.post(CONTRACTS_URL, client);
        return resp;
    } catch (error) {
        console.error("POLICY: CONTRACT, ERROR: {}.", error);
        throw error;
    }
}


// claims
export const getAllClaim = async (): Promise<AxiosResponse<Claim[]>> => {
    try {
        const resp = await axios.get(CLAIMS_URL);
        return resp;
    } catch (error) {
        console.error( "POLICY: CLAIM, ERROR: {}.", error);
        throw error;
    }
}

export const getClaimById = async (id: string): Promise<AxiosResponse<Claim>> => {
    try {
        const resp = await axios.get(CLAIMS_URL + id);
        return resp;
    } catch (error) {
        console.error( "POLICY: CLAIM, ERROR: {}.", error);
        throw error;
    }
}

export const createClaim = async (client: Contract): Promise<AxiosResponse<Claim>> => {
    try {
        const resp = await axios.post(CLAIMS_URL, client);
        return resp;
    } catch (error) {
        console.error( "POLICY: CLAIM, ERROR: {}.", error);
        throw error;
    }
}
