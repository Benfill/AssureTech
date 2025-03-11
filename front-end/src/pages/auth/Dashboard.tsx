import React, { useEffect, useState } from "react";
import UserTable from "../../components/auth/Table";
import { Alert } from "@mui/material";

export const Dashboard = () => {
  const [error, setError] = useState("");

  useEffect(() => {
    const timeRef = setTimeout(() => {
      setError("");
    }, 5000);

    return () => {
      clearTimeout(timeRef);
    };
  }, [error]);
  return (
    <div className="h-full">
      {error && <Alert severity="error">{error}</Alert>}
      <UserTable setError={setError} />
    </div>
  );
};
