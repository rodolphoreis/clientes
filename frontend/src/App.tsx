import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import "./App.css";

interface Client {
  id: string;
  name: string;
  surname: string;
  company: string;
  status: boolean;
  phone: number;
}

function App() {
  const [clients, setClients] = useState<Client[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    company: "",
    status: true,
    phone: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/client")
      .then((response) => setClients(response.data.data))
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    let value: string | number | boolean = e.target.value as
      | string
      | number
      | boolean;
    if (typeof value === "boolean") {
      value = value ? "1" : "2";
    }
    setFormData({
      ...formData,
      [e.target.name as string]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post("http://localhost:3000/client", {
        name: formData.name,
        surname: formData.surname,
        company: formData.company,
        status: Boolean(formData.status),
        phone: Number(formData.phone),
      });
      console.log(response);
      setClients([...clients, response.data.data]);
      setFormData({
        name: "",
        surname: "",
        company: "",
        status: true,
        phone: "",
      });
      console.log(formData, "formData erro do console");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/client/${id}`);
      setClients(clients.filter((client) => client.id !== id));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
        />
        <TextField
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />

        <FormControl>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value="1">Active</MenuItem>
            <MenuItem value="0">Inactive</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Client
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients &&
              clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.surname}</TableCell>
                  <TableCell>{client.company}</TableCell>
                  <TableCell>{client.status ? "Active" : "Inactive"}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(client.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
