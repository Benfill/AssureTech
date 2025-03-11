import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios, { AxiosError, RawAxiosRequestHeaders } from "axios";
import React, { useEffect, useState } from "react";
import { Client } from "../../../models/Client";

const url = "http://localhost:8080/api/";

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
  const day = date.getDay() < 10 ? "0" + date.getDay() : date.getDay();
  return `${day}/${month}/${year}`;
};

// Define the error type for contract-related errors
type ContractErrs = {
  typeErr: string;
  effectiveDateErr: string;
  expirationDateErr: string;
  coverageAmountErr: string;
  clientIdErr: string;
};

type Props = {
  onCancel: () => void;
};

const NewContract: React.FC<Props> = ({ onCancel }) => {
  const client = axios.create({
    baseURL: url,
  });

  const [type, setType] = useState<"CAR" | "HOME" | "HEALTH">("CAR");
  const [effectiveDate, setEffectiveDate] = useState<Date>(new Date());
  const [expirationDate, setExpirationDate] = useState<Date>(new Date());
  const [coverageAmount, setCoverageAmount] = useState<number>(0);
  const [clientId, setClientId] = useState<number>(1);
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john@doe.org",
      address: "org",
      phone: "04748732",
      userId: "1",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@smith.com",
      address: "com",
      phone: "09832742",
      userId: "2",
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errs, setErrs] = useState<ContractErrs>({
    typeErr: "",
    effectiveDateErr: "",
    expirationDateErr: "",
    coverageAmountErr: "",
    clientIdErr: "",
  });
  const [succ, setSucc] = useState<string>("");
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    // getClients();
  }, []);

  const postContract = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Reset errors before making the API call
    setErrs({
      typeErr: "",
      effectiveDateErr: "",
      expirationDateErr: "",
      coverageAmountErr: "",
      clientIdErr: "",
    });

    await client
      .post(
        `contracts`,
        {
          type: type,
          effectiveDate: formatDate(effectiveDate),
          expirationDate: formatDate(expirationDate),
          coverageAmount: coverageAmount,
          clientId: clientId,
        },
        {
          headers: {
            Accept: "application/json",
          } as RawAxiosRequestHeaders,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setSucc("Contract was saved successfully.");
          // Reset form fields after successful submission
          setType("CAR");
          setEffectiveDate(new Date());
          setExpirationDate(new Date());
          setCoverageAmount(0);
          setClientId(0);
        }
      })
      .catch((error) => {
        console.log(error);

        if (error.response?.data?.errors) {
          const errors = error.response.data.errors;
          setErrs({
            typeErr: errors.type || "",
            effectiveDateErr: errors.effectiveDate || "",
            expirationDateErr: errors.expirationDate || "",
            coverageAmountErr: errors.coverageAmount || "",
            clientIdErr: errors.clientId || "",
          });
        }
        if (error.response?.data?.message) {
          setErr(error.response.data.message);
        }
      });
    setLoading(false);
  };

  const getClients = async () => {
    setLoading(true);
    await client
      .get(`customers`)
      .then((response) => {
        if (response.status === 200) {
          setClients(response.data);
        }
      })
      .catch((err) => {
        setErr((err as AxiosError).message);
      });
    setLoading(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <p
        onClick={onCancel}
        className="text-2xl fixed left-2 top-16 text-gray-700 border rounded-lg w-10 text-center hover:bg-gray-700 hover:text-white cursor-pointer"
      >
        {" "}
        {"<-"}{" "}
      </p>
      <div className="p-4">
        {succ && (
          <p className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md mb-4">
            {succ}
          </p>
        )}
        {err && (
          <p className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md mb-4">
            {err}
          </p>
        )}

        <form
          onSubmit={postContract}
          className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
        >
          {/* Coverage Amount Input */}
          <TextField
            fullWidth
            label="Coverage Amount"
            type="number"
            value={coverageAmount}
            onChange={(e) => setCoverageAmount(Number(e.target.value))}
            margin="normal"
            variant="outlined"
            error={!!errs.coverageAmountErr}
            helperText={errs.coverageAmountErr}
          />

          {/* Effective Date Input */}
          <TextField
            fullWidth
            label="Effective Date"
            type="date"
            value={effectiveDate.toISOString().split("T")[0]}
            onChange={(e) => setEffectiveDate(new Date(e.target.value))}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errs.effectiveDateErr}
            helperText={errs.effectiveDateErr}
          />

          {/* Expiration Date Input */}
          <TextField
            fullWidth
            label="Expiration Date"
            type="date"
            value={expirationDate.toISOString().split("T")[0]}
            onChange={(e) => setExpirationDate(new Date(e.target.value))}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errs.expirationDateErr}
            helperText={errs.expirationDateErr}
          />

          {/* Contract Type Dropdown */}
          <FormControl fullWidth margin="normal" error={!!errs.typeErr}>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={(e) =>
                setType(e.target.value as "CAR" | "HOME" | "HEALTH")
              }
              label="Type"
            >
              <MenuItem value="CAR">CAR</MenuItem>
              <MenuItem value="HOME">HOME</MenuItem>
              <MenuItem value="HEALTH">HEALTH</MenuItem>
            </Select>
            {errs.typeErr && (
              <p className="text-red-500 text-xs italic">{errs.typeErr}</p>
            )}
          </FormControl>

          {/* Client Dropdown */}
          <FormControl fullWidth margin="normal" error={!!errs.clientIdErr}>
            <InputLabel>Customer</InputLabel>
            <Select
              value={clientId}
              onChange={(e) => setClientId(Number(e.target.value))}
              label="Customer"
            >
              {clients.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.firstName} {client.lastName}
                </MenuItem>
              ))}
            </Select>
            {errs.clientIdErr && (
              <p className="text-red-500 text-xs italic">{errs.clientIdErr}</p>
            )}
          </FormControl>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            {loading ? "Loading..." : "Create Contract"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewContract;
