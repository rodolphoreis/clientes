import { Link } from "react-router-dom";
import "./home.css";
import App from "../App";
const Home = () => {
  return (
    <>
      <Link to="/" className="button-link">
        Home
      </Link>
      <Link to="/cadastrar" className="button-link">
        Cadastrar
      </Link>
      <Link to="/editar" className="button-link">
        Editar
      </Link>
      <Link to="/pesquisar" className="button-link">
        <App />
      </Link>
    </>
  );
};

export default Home;
