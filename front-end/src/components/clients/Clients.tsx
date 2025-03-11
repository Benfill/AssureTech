import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  useTheme,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Client } from "../../models/Client";
import { getAllClients, createClient } from "../../apis/customer";

const Clients = () => {
  const theme = useTheme();
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Client, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    userId: 1,
  });

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    const filtered = clients.filter((client) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        client.firstName.toLowerCase().includes(searchLower) ||
        client.lastName.toLowerCase().includes(searchLower) ||
        client.email.toLowerCase().includes(searchLower) ||
        client.phone.toLowerCase().includes(searchLower)
      );
    });
    setFilteredClients(filtered);
  }, [searchQuery, clients]);

  const fetchClients = async () => {
    try {
      const response = await getAllClients();
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createClient(formData as Client);
      handleClose();
      fetchClients();
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phone: "",
        userId: 1,
      });
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box sx={{ width: "100%", height: "100%", p: 0 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Clients
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            size="small"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              width: 300,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
          />
          <IconButton
            color="primary"
            onClick={handleOpen}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.dark,
              },
              color: "white",
              width: 40,
              height: 40,
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      <TableContainer
        sx={{
          width: "100%",
          height: "calc(100% - 72px)", // Subtracting header height
          "& .MuiTableContainer-root": {
            height: "100%",
          },
        }}
      >
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="clients table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                  backgroundColor: (theme) => theme.palette.grey[50],
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                  backgroundColor: (theme) => theme.palette.grey[50],
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                  backgroundColor: (theme) => theme.palette.grey[50],
                }}
              >
                Phone
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                  backgroundColor: (theme) => theme.palette.grey[50],
                }}
              >
                Address
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow
                key={client.id}
                sx={{
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.grey[50],
                  },
                }}
              >
                <TableCell>{`${client.firstName} ${client.lastName}`}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Add New Client</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ pt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              name="firstName"
              label="First Name"
              type="text"
              fullWidth
              value={formData.firstName}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="lastName"
              label="Last Name"
              type="text"
              fullWidth
              value={formData.lastName}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="phone"
              label="Phone"
              type="tel"
              fullWidth
              value={formData.phone}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="address"
              label="Address"
              type="text"
              fullWidth
              value={formData.address}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleClose} sx={{ textTransform: "none" }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 3,
              }}
            >
              Add Client
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Clients;
