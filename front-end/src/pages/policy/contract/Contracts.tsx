import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Contract } from "../../../models/Contract";
import NewContract from "./NewContract";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const url = "http://localhost:8080/api/user/contracts";

const Contracts = () => {
  const client = axios.create({
    baseURL: url,
  });

  const [contracts, setContracts] = useState<Contract[]>([]);
  const [creating, setCreating] = useState<boolean>(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null); // Track expanded row

  useEffect(() => {
    getContracts();
  }, [creating]);

  const getContracts = async () => {
    try {
      const response: AxiosResponse = await client.get(``);
      if (response.status === 200) {
        setContracts(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: number) => {
    await client
      .delete(`/${id}`)
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          setContracts(contracts.filter((contract) => contract.id !== id));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleExpandRow = (contractId: number) => {
    if (expandedRow === contractId) {
      // Collapse the row if it's already expanded
      setExpandedRow(null);
    } else {
      // Expand the row
      setExpandedRow(contractId);
    }
  };

  if (creating) {
    return (
      <div className="flex justify-center items-center h-[800px]">
        <NewContract onCancel={() => setCreating(false)} />
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Contracts Management</h1>
        <Button
          variant="text"
          color="primary"
          onClick={() => setCreating(true)}
        >
          Create New Claim
        </Button>
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell /> {/* Empty cell for expand/collapse icon */}
            <TableCell>#ID</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Effective Date</TableCell>
            <TableCell align="right">Expiration Date</TableCell>
            <TableCell align="right">Coverage Amount</TableCell>
            <TableCell align="right">Client ID</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contracts.map((contract) => (
            <React.Fragment key={contract.id}>
              <TableRow>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => handleExpandRow(contract.id)}
                  >
                    {expandedRow === contract.id ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {contract.id}
                </TableCell>
                <TableCell align="right">{contract.type}</TableCell>
                <TableCell align="right">
                  {contract.effectiveDate?.toString()}
                </TableCell>
                <TableCell align="right">
                  {contract.expirationDate?.toString()}
                </TableCell>
                <TableCell align="right">{contract.coverageAmount}</TableCell>
                <TableCell align="right">{contract.clientId}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(contract.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={8}
                >
                  <Collapse
                    in={expandedRow === contract.id}
                    timeout="auto"
                    unmountOnExit
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2">Claims</h3>
                      {contract.claims && contract.claims.length > 0 ? (
                        <Table size="small" aria-label="claims">
                          <TableHead>
                            <TableRow>
                              <TableCell>#ID</TableCell>
                              <TableCell align="right">Date</TableCell>
                              <TableCell align="right">Description</TableCell>
                              <TableCell align="right">
                                Claimed Amount
                              </TableCell>
                              <TableCell align="right">
                                Reimbursed Amount
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {contract.claims.map((claim) => (
                              <TableRow key={claim.id}>
                                <TableCell component="th" scope="row">
                                  {claim.id}
                                </TableCell>
                                <TableCell align="right">
                                  {claim.date?.toString()}
                                </TableCell>
                                <TableCell align="right">
                                  {claim.description}
                                </TableCell>
                                <TableCell align="right">
                                  {claim.claimedAmount}
                                </TableCell>
                                <TableCell align="right">
                                  {claim.reimbursedAmount}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <p className="text-gray-500">
                          No claims found for this contract.
                        </p>
                      )}
                    </div>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Contracts;
