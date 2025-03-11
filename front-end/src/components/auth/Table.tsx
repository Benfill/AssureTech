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
  InputAdornment,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
  Switch,
  FormControlLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { User } from "../../models/User";
import { Role } from "../../models/Role";
import { getAllRoles, getAllUsers, updateUser } from "../../apis/auth";

interface TableProps {
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const UserTable: React.FC<TableProps> = ({ setError }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [userEnabled, setUserEnabled] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.phone.toLowerCase().includes(searchLower)
      );
    });
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error: unknown) {
      console.error("Error fetching users:", error);
      setError("Error fetching users: " + error!.message);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await getAllRoles();
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
      setError("Error fetching users: " + error!.message);
    }
  };

  const handleOpen = (user: User) => {
    setSelectedUser(user);
    setSelectedRoles(user.roles.map((role) => role.id));
    setUserEnabled(user.enable);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setSelectedRoles([]);
  };

  const handleRoleChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value as number[];
    setSelectedRoles(value);
  };

  const handleEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEnabled(event.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      const updatedUser = {
        ...selectedUser,
        roles: roles.filter((role) => selectedRoles.includes(role.id)),
        enable: userEnabled,
      };
      console.log(updatedUser);

      await updateUser(updatedUser);
      handleClose();
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
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
          Users
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            size="small"
            placeholder="Search users..."
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
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="users table">
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
                Status
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                  backgroundColor: (theme) => theme.palette.grey[50],
                }}
              >
                Roles
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                  backgroundColor: (theme) => theme.palette.grey[50],
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.grey[50],
                  },
                }}
              >
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Chip
                    label={user.enable ? "Active" : "Inactive"}
                    color={user.enable ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {user.roles.map((role) => (
                      <Chip
                        key={role.id}
                        label={role.name}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleOpen(user)}
                    sx={{ color: "primary.main" }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { borderRadius: 2, width: 500 },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Edit User Roles</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ pt: 2 }}>
            {selectedUser && (
              <>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  {`${selectedUser.firstName} ${selectedUser.lastName}`}
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={userEnabled}
                      onChange={handleEnabledChange}
                    />
                  }
                  label={userEnabled ? "Active" : "Inactive"}
                  sx={{ mb: 2, display: "block" }}
                />

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="role-select-label">Assigned Roles</InputLabel>
                  <Select
                    labelId="role-select-label"
                    multiple
                    value={selectedRoles}
                    onChange={handleRoleChange}
                    input={<OutlinedInput label="Assigned Roles" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((roleId) => {
                          const role = roles.find((r) => r.id === roleId);
                          return role ? (
                            <Chip
                              key={role.id}
                              label={role.name}
                              size="small"
                            />
                          ) : null;
                        })}
                      </Box>
                    )}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
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
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default UserTable;
