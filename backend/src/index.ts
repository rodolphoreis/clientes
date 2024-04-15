import express from "express";
import cors from "cors";
import prismaClient from "../prisma/prismaClient";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/client", async (_, response) => {
  try {
    const read = await prismaClient.cliente.findMany();
    return response.status(200).json({ message: read, error: false });
  } catch (error) {
    return response.status(500).json({ message: error, error: true });
  }
});

app.post("/client", async (request, response) => {
  const { name, surname, company, status, phone } = request.body;

  try {
    const create = await prismaClient.cliente.create({
      data: {
        name,
        surname,
        company,
        status,
        phone,
      },
    });
    return response.status(204).json({ message: create, error: false });
  } catch (error) {
    return response.status(500).json({ message: error, error: true });
  }
});

app.listen(PORT, () => {
  console.log(`Running server port: ${PORT}`);
});