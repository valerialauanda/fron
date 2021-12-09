import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import "./style.css";

import logoImg from "../../../assets/logo.jpg";

export default function Home() {
  const history = useHistory();

  const empresaName = localStorage.getItem("nomeEmpresa");
  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Controle de Estoque" />
        <span>Bem vinda, {empresaName}</span>
        <Link className="button" to="/painel-vendedor">
          Funcionário
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041"></FiPower>
        </button>
      </header>
      <h1>Gerente Painel de {empresaName}</h1>
      <ul>
        <Link className="button" to="/produtos">
          Produtos
        </Link>
        <Link className="button" to="/clientes">
          Clientes
        </Link>
        <Link className="button" to="/pedidos">
          Pedidos
        </Link>
        <Link className="button" to="/entregas">
          Entregas
        </Link>
        <Link className="button" to="/relatorios-renda">
          Relatórios
        </Link>
      </ul>
    </div>
  );
}
