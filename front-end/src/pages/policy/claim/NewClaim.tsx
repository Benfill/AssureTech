import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Claim } from "../../../models/Claim";
import { Contract } from "../../../models/Contract";

interface NewClaimProps {
    onCancel: () => void;
}

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() < 10 ? ('0' + date.getMonth()) : date.getMonth();
    const day = date.getDay() < 10 ? ('0' + date.getDay()) : date.getDay();
    return `${day}/${month}/${year}`;
};

const NewClaim: React.FC<NewClaimProps> = ({ onCancel }) => {
    const [claim, setClaim] = useState<Claim>({
        id: 0,
        date: new Date(),
        description: "",
        claimedAmount: 0,
        reimbursedAmount: 0,
        contractId: 0
    });

    const [contracts, setContracts] = useState<Contract[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        // Fetch contracts for the dropdown
        const fetchContracts = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:8080/api/contracts");
                if (response.status === 200) {
                    setContracts(response.data);
                }
            } catch (err) {
                console.log(err);
                setError("Failed to fetch contracts");
            }
            setLoading(false);
        };

        fetchContracts();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClaim({
            ...claim,
            [name]: name === 'claimedAmount' || name === 'reimbursedAmount' ? Number(value) : value
        });
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClaim({
            ...claim,
            date: new Date(e.target.value)
        });
    };

    const handleContractChange = (e: SelectChangeEvent<number>) => {
        setClaim({
            ...claim,
            contractId: e.target.value as number
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        if (!claim.date || !claim.description || !claim.contractId) {
            setError("Please fill in all required fields");
            setLoading(false);
            return;
        }

        try {
            // Format the date before sending to API
            const formattedClaim = {
                ...claim,
                date: formatDate(claim.date)
            };
            
            const response = await axios.post("http://localhost:8080/api/claims", formattedClaim);
            if (response.status === 201 || response.status === 200) {
                onCancel(); // Return to claims list on success
            }
        } catch (err) {
            console.log(err);
            setError("Failed to create claim");
        }
        setLoading(false);
    };

    return (
        <>
            <p onClick={onCancel} className="text-2xl fixed left-2 top-16 text-gray-700 border rounded-lg w-10 text-center hover:bg-gray-700 hover:text-white cursor-pointer"> {'<-'} </p>
            <div className="p-4">
                <Card sx={{ maxWidth: 600, width: '100%', margin: '0 auto' }}>
                    <CardContent>
                        <h2 className="text-xl font-bold mb-4">Create New Claim</h2>
                        
                        {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md mb-4">{error}</div>}
                        
                        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Claim Date"
                                        type="date"
                                        value={claim.date ? claim.date.toISOString().split('T')[0] : ''}
                                        onChange={handleDateChange}
                                        margin="normal"
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        name="description"
                                        value={claim.description}
                                        onChange={handleInputChange}
                                        margin="normal"
                                        required
                                        multiline
                                        rows={3}
                                    />
                                </Grid>
                                
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Claimed Amount"
                                        name="claimedAmount"
                                        type="number"
                                        value={claim.claimedAmount || ''}
                                        onChange={handleInputChange}
                                        margin="normal"
                                        required
                                    />
                                </Grid>
                                
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Reimbursed Amount"
                                        name="reimbursedAmount"
                                        type="number"
                                        value={claim.reimbursedAmount || ''}
                                        onChange={handleInputChange}
                                        margin="normal"
                                    />
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <FormControl fullWidth margin="normal" required>
                                        <InputLabel id="contract-select-label">Contract</InputLabel>
                                        <Select
                                            labelId="contract-select-label"
                                            value={claim.contractId || ''}
                                            onChange={handleContractChange}
                                            label="Contract"
                                        >
                                            <MenuItem value=""><em>Select a contract</em></MenuItem>
                                            {contracts.map((contract) => (
                                                <MenuItem key={contract.id} value={contract.id}>
                                                    #{contract.id} - {contract.type} (Client: {contract.clientId})
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                
                                <Grid item xs={12} className="flex justify-end gap-2 mt-4">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        style={{ marginTop: '20px' }}
                                        disabled={loading}
                                    >
                                        {loading ? "Loading..." : "Create Claim"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default NewClaim;
