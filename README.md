# Client  App

Este é um aplicativo simples para gerenciamento de clientes, onde você pode cadastrar, editar e excluir clientes.

## Backend

O backend foi desenvolvido utilizando Node.js com o framework Express e o banco de dados PostgreSQL. Foi utilizado o Prisma ORM para lidar com as operações no banco de dados.

### Instalação

Certifique-se de ter o Node.js e o PostgreSQL instalados em sua máquina.

1. Clone este repositório:

   ```bash
   git clone https://github.com/rodolphoreis/clientes.git
   ```

2. Instale as dependências:

   ```bash
   cd backend
   npm install
   ```

3. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

O servidor estará em execução em `http://localhost:3000`.

### Dependências

- **Express**: Framework web para Node.js.
- **Prisma**: ORM para Node.js e TypeScript.
- **pg**: Cliente PostgreSQL para Node.js.

## Frontend

O frontend foi desenvolvido utilizando React.js com Material-UI para estilização e axios para fazer requisições HTTP.

### Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/rodolphoreis/clientes.git
   ```

2. Instale as dependências:

   ```bash
   cd frontend
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm start
   ```

O aplicativo estará disponível em `http://localhost:3000`.

### Dependências

- **React**: Biblioteca JavaScript para construir interfaces de usuário.
- **Material-UI**: Biblioteca de componentes React para um design mais rápido e fácil.
- **axios**: Cliente HTTP baseado em promessas para o navegador e Node.js.

## Modelo de Dados

O modelo de dados utilizado no backend é o seguinte:

```prisma
model Cliente {
  id        String    @id @default(uuid())
  name      String
  surname   String
  company   String
  status    Boolean
  phone     Int

  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

O modelo representa um cliente com campos como nome, sobrenome, empresa, status e telefone.
