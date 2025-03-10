import { Button, FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";
import axios, { AxiosError, RawAxiosRequestHeaders } from "axios";
import React, { useEffect, useState } from "react";
import { Client } from "../../../models/Client";

const url = "http://localhost:8082/api/";

type AccErrs = {
    balanceErr: string;
    typeErr: string;
}

const NewContract: React.FC = () => {
    const client = axios.create({
        baseURL: url,
    });

    const [type, setType] = useState<'CAR'| 'HOME' | 'HEALTH'>('CAR');
    const [effectiveDate, setEffectiveDate] = useState<Date>();
    const [expirationDate, setExpirationDate] = useState<Date>();
    const [coverageAmount, setCoverageAmount] = useState<number>(0);
    const [clientId, setClientId] = useState<number>(0);
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errs, setErrs] = useState<AccErrs>({
        balanceErr: "",
        typeErr: ""
    });
    const [succ, setSucc] = useState<string>("");
    const [err, setErr] = useState<string>("");

    useEffect(() => {
      getClients();
      setEffectiveDate(new Date);
      setExpirationDate(new Date);
  }, []);


    const postContract = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await client.post(`contracts`, {type: type, effectiveDate: effectiveDate, expirationDate: expirationDate,coverageAmount: coverageAmount, clientId: clientId}, {
            headers: {
                'Accept': 'application/json',
            } as RawAxiosRequestHeaders,
        }).then(response => {
            if (response.status === 200) {
                setSucc("Clients was saved with success.");
            } 
            // setType();
            // setType("");
        }).catch(error => {
            console.log(error);
            
            if(error.response.data.errors){
                const errors = error.response.data.errors;
                setErrs({
                    balanceErr: errors.balance || null,
                    typeErr: errors.type || null,
                });
            }
            if (error.response.data.message) {
               setErr(error.response.data.message);
            }
        });
        setLoading(false);
    }


    const getClients = async () => {
        setLoading(true);

        await client.get(`customers`)
        .then(response => {
            if (response.status === 200) {
                setClients(response.data);
                console.log(clients);
            }  

        }).catch(err => {
            setErr((err as AxiosError).message);
        });
        setLoading(false);
    }

    if (loading) return <p>loading...</p>; 

    return (
        <>
          {succ && 
            <p className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md mb-4">
          {succ}</p>}
          {err && <p className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md mb-4">{err}</p>}

          <form onSubmit={postContract} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* Contract Coverage Amount Input */}
            <div className="mb-4">
              <Input
                error={errs?.balanceErr !== ""}
                placeholder="Contract coverageAmount"
                name="coverageAmount"
                value={coverageAmount}
                onChange={(e) => setCoverageAmount(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errs?.balanceErr && (
                <p className="mt-2 text-sm text-red-600 bg-red-50 border-l-4 border-red-500 p-2 rounded-lg">
                  {errs.balanceErr}
                </p>
              )}
            </div>

            {/* <div className="mb-4">
              <Input
                error={errs?.balanceErr !== ""}
                placeholder="Contract effectiveDate"
                name="effectiveDate"
                value={coverageAmount}
                onChange={(e) => setEffectiveDate(e.target.value as Date)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errs?.balanceErr && (
                <p className="mt-2 text-sm text-red-600 bg-red-50 border-l-4 border-red-500 p-2 rounded-lg">
                  {errs.balanceErr}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Input
                error={errs?.balanceErr !== ""}
                placeholder="Contract coverageAmount"
                name="coverageAmount"
                value={coverageAmount}
                onChange={(e) => setCoverageAmount(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errs?.balanceErr && (
                <p className="mt-2 text-sm text-red-600 bg-red-50 border-l-4 border-red-500 p-2 rounded-lg">
                  {errs.balanceErr}
                </p>
              )}
            </div> */}
          
            {/* Contract Type Dropdown */}
            <div className="mb-4">
              <FormControl error={errs?.typeErr !== ""} className="w-full">
                <InputLabel id="type-select-label" className="text-gray-700">Type</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select"
                  value={type}
                  name="type"
                  label="Type"
                  onChange={(e) => setType(e.target.value as ('CAR' | 'HOME'| 'HEALTH'))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <MenuItem value="CAR">CAR</MenuItem>
                  <MenuItem value="HOME">HOME</MenuItem>
                  <MenuItem value="HEALTH">HEALTH</MenuItem>
                </Select>
              </FormControl>
              {errs?.typeErr && (
                <p className="mt-2 text-sm text-red-600 bg-red-50 border-l-4 border-red-500 p-2 rounded-lg">
                  {errs.typeErr}
                </p>
              )}
            </div>
          
            {/* Client Dropdown */}
            <div className="mb-6">
              <FormControl className="w-full">
                <InputLabel id="customer-select-label" className="text-gray-700">Customer</InputLabel>
                <Select
                  labelId="customer-select-label"
                  id="customer-select"
                  value={clientId}
                  name="customerId"
                  label="Customer"
                  onChange={(e) => setClientId(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {clients.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.firstName + " " + client.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          
            {/* Create Contract Button */}
            <Button
              type="submit"
              variant="outlined"
              color="success"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? "Loading..." : "Create Contract"}
            </Button>
          </form>
</>
    );
}

export default NewContract;
