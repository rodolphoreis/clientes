import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

interface Client {
  id: string;
  name: string;
}

function App() {
  const [clients, setClients] = useState<Client[]>([]);
  console.log(clients);
  useEffect(() => {
    axios
      .get("http://localhost:3000/client")
      .then((response) => setClients(response.data.data))
      .catch(() => {
        console.log("error");
      })
      .finally(() => {
        console.log("Finally");
      });
  }, []);

  return (
    <>
      <h2>Clientes:</h2>

      {clients.map((client) => (
        <h2 key={client.id}>{client.name}</h2>
      ))}
    </>
  );
}

export default App;
