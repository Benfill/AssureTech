import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Claim } from "../../../models/Claim";
import NewClaim from "./NewClaim";

const url = "http://localhost:8082/api/claims";

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() < 10 ? ('0' + date.getMonth()) : date.getMonth();
    const day = date.getDay() < 10 ? ('0' + date.getDay()) : date.getDay();
    return `${day}/${month}/${year}`;
};

const Claims = () => {
    const client = axios.create({
        baseURL: url,
    });

    const [claims, setClaims] = useState<Claim[]>([]);
    const [creating, setCreating] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getClaims();
    }, [creating]);

    const getClaims = async () => {
        setLoading(true);
        try {
            const response: AxiosResponse = await client.get(``);
            if (response.status === 200) {
                setClaims(response.data);
            }
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        setLoading(true);
        await client.delete(`/${id}`)
            .then(response => {
                console.log(response);

                if (response.status === 200) {
                    setClaims(claims.filter(claim => claim.id !== id));
                }
            }).catch(err => {
                console.log(err);
            });
        setLoading(false);
    };

    if (creating) {
        return <NewClaim onCancel={() => setCreating(false)} />;
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Claims Management</h1>
                <Button 
                    variant="text" 
                    color="primary" 
                    onClick={() => setCreating(true)}
                    disabled={loading}
                >
                    Create New Claim
                </Button>
            </div>
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="claims table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Claimed Amount</TableCell>
                            <TableCell align="right">Reimbursed Amount</TableCell>
                            <TableCell align="right">Contract ID</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">Loading...</TableCell>
                            </TableRow>
                        ) : claims.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">No claims found</TableCell>
                            </TableRow>
                        ) : (
                            claims.map((claim) => (
                                <TableRow key={claim.id}>
                                    <TableCell component="th" scope="row">
                                        {claim.id}
                                    </TableCell>
                                    <TableCell>
                                        {claim.date ? formatDate(new Date(claim.date)) : ''}
                                    </TableCell>
                                    <TableCell>{claim.description}</TableCell>
                                    <TableCell align="right">{claim.claimedAmount}</TableCell>
                                    <TableCell align="right">{claim.reimbursedAmount}</TableCell>
                                    <TableCell align="right">{claim.contractId}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDelete(claim.id)}
                                            disabled={loading}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Claims;
