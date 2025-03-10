import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Contract } from "../../../models/Contract";
import NewContract from "./NewContract";

const url = "http://localhost:8082/api/contracts";

const Contracts = () => {

    const client = axios.create({
        baseURL: url,
    });
    
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [creating, setCreating] = useState<boolean>(false);

    useEffect(() => {
        getContracts();
    }, []);

    const getContracts = async () => {
        try {
            const response: AxiosResponse = await client.get(``);
            if (response.status === 200) {
                setContracts(response.data);
            }  
        } catch(err) {
            console.log(err);
        }
    }
    if (creating) {
      return <NewContract />
    }
    return (
    <TableContainer component={Paper}>
      <Button onClick={() => setCreating(true)}>Create Contract</Button>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#ID</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Coverage Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contracts.map((contract) => (
            <TableRow
              key={contract.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {contract.id}
              </TableCell>
              <TableCell align="right">{contract.type}</TableCell>
              <TableCell align="right">{contract.coverageAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
}

export default Contracts;
