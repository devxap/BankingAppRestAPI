import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";

const AccountApp = () => {
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState({ id: "", accountHolderName: "", balance: 0 });
  const [id, setId] = useState("");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const baseURL = "http://localhost:8080/api/accounts";

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(`${baseURL}/all`);
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const addAccount = async () => {
    try {
      await axios.post(`${baseURL}/add`, account);
      setMessage("Account added successfully!");
      setOpen(true);
      fetchAccounts();
    } catch (error) {
      console.error("Error adding account:", error);
    }
  };

  const fetchAccountById = async () => {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      setAccount(response.data);
    } catch (error) {
      console.error("Error fetching account by ID:", error);
    }
  };

  const depositAmount = async () => {
    try {
      await axios.put(`${baseURL}/${id}/deposit`, { amount });
      setMessage("Amount deposited successfully!");
      setOpen(true);
      fetchAccounts();
    } catch (error) {
      console.error("Error depositing amount:", error);
    }
  };

  const withdrawAmount = async () => {
    try {
      await axios.put(`${baseURL}/${id}/withdraw`, { amount });
      setMessage("Amount withdrawn successfully!");
      setOpen(true);
      fetchAccounts();
    } catch (error) {
      console.error("Error withdrawing amount:", error);
    }
  };

  const deleteAccount = async () => {
    try {
      await axios.delete(`${baseURL}/${id}/delete`);
      setMessage("Account deleted successfully!");
      setOpen(true);
      fetchAccounts();
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <Container
      sx={{
        backgroundColor: "black",
        minHeight: "100vh",
        padding: "2rem",
        color: "white",
      }}
    >
      <Typography variant="h4" gutterBottom align="center" sx={{ color: "white" }}>
        Account Management Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Add Account */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              backgroundColor: "black",
              border: "1px solid white",
              color: "white",
            }}
          >
            <Typography variant="h6">Add Account</Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Account Holder Name"
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
              }}
              value={account.accountHolderName}
              onChange={(e) => setAccount({ ...account, accountHolderName: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Balance"
              type="number"
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
              }}
              value={account.balance}
              onChange={(e) => setAccount({ ...account, balance: parseFloat(e.target.value) })}
            />
            <Button
              onClick={addAccount}
              sx={{
                backgroundColor: "white",
                border: "1px solid black",
                color: "black",
                "&:hover": { backgroundColor: "lightgray" },
              }}
              fullWidth
            >
              Add Account
            </Button>
          </Paper>
        </Grid>

        {/* Get Account by ID */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              backgroundColor: "black",
              border: "1px solid white",
              color: "white",
            }}
          >
            <Typography variant="h6">Get Account by ID</Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Account ID"
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
              }}
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <Button
              onClick={fetchAccountById}
              sx={{
                backgroundColor: "white",
                border: "1px solid black",
                color: "black",
                "&:hover": { backgroundColor: "lightgray" },
              }}
              fullWidth
            >
              Fetch Account
            </Button>
            {account.id && (
              <Box mt={2}>
                <Typography>ID: {account.id}</Typography>
                <Typography>Name: {account.accountHolderName}</Typography>
                <Typography>Balance: {account.balance}</Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Deposit/Withdraw */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              backgroundColor: "black",
              border: "1px solid white",
              color: "white",
            }}
          >
            <Typography variant="h6">Deposit/Withdraw Amount</Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Amount"
              type="number"
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
              }}
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
            <Box display="flex" gap={2} mt={2}>
              <Button
                onClick={depositAmount}
                sx={{
                  backgroundColor: "white",
                  border: "1px solid black",
                  color: "black",
                  "&:hover": { backgroundColor: "lightgray" },
                }}
              >
                Deposit
              </Button>
              <Button
                onClick={withdrawAmount}
                sx={{
                  backgroundColor: "white",
                  border: "1px solid black",
                  color: "black",
                  "&:hover": { backgroundColor: "lightgray" },
                }}
              >
                Withdraw
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Delete Account */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              backgroundColor: "black",
              border: "1px solid white",
              color: "white",
            }}
          >
            <Typography variant="h6">Delete Account</Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Account ID"
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
              }}
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <Button
              onClick={deleteAccount}
              sx={{
                backgroundColor: "white",
                border: "1px solid black",
                color: "black",
                "&:hover": { backgroundColor: "lightgray" },
              }}
              fullWidth
            >
              Delete Account
            </Button>
          </Paper>
        </Grid>

        {/* All Accounts */}
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              backgroundColor: "black",
              border: "1px solid white",
              color: "white",
            }}
          >
            <Typography variant="h6">All Accounts</Typography>
            <List>
              {accounts.map((acc) => (
                <ListItem key={acc.id}>
                  <ListItemText primary={`${acc.id} - ${acc.accountHolderName} - ₹${acc.balance}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AccountApp;
