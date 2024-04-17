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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/client",
        formData
      );
      console.log(formData);
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

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value={true}>Active</MenuItem>
          <MenuItem value={false}>Inactive</MenuItem>
        </Select>
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
