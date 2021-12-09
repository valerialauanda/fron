import React,{ useState, useEffect } from "react";
import  {Link,useHistory} from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import { FaWhmcs } from "react-icons/fa"

import "./style.css";

import logoImg from "../../../assets/logo.jpg"

import api from "../../../services/api";

export default function Cliente() {

  const [clientes, setClientes] = useState([]);

  const history = useHistory()

  const empresaName = localStorage.getItem("nomeEmpresa");
  const empresaId = localStorage.getItem("empresaId");


  useEffect(() => {
    api
      .get("profile/cliente", {
        headers: {
          Authorization: empresaId
        }
      })
      .then(response => {
        setClientes(response.data);
      });
  }, [empresaId]);

  async function handleDeleteProd(id){
      try {
        await api.delete(`clientes/${id}`,{
            headers: {
              Authorization: empresaId
            }
          })

          setClientes(clientes.filter(cliente => cliente.id !== id))

      } catch (erro) {
          alert('Erro ao deletar Cliente, tente novamente.')
      }
  }

  function handleLogout(){

      localStorage.clear()
    history.push('/')
  }
  function salvar(id){
    localStorage.setItem('idClie', id);
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Controle de Estoque" />
        <span>Bem vinda, {empresaName}</span>
        <Link className="button" to="/painel-vendedor">
          Menu
        </Link>
        <Link className="button" to="/cliente-novo">
          Cadastrar Novo Cliente
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041"></FiPower>
        </button>
      </header>
      <h1>Clientes Cadastrados</h1>

      <ul>
        {
        clientes.map(cliente => (
          <li key={cliente.id}>
            <strong>NOME DO CLIENTE :</strong>
            <p>{cliente.nome}</p>
            <strong>CPF DO CLIENTE :</strong>
            <p>{cliente.cpf}</p>
            <strong>TELEFONE DO CLIENTE :</strong>
            <p>{cliente.numero}</p>
            <strong>ENDEREÇO DO CLIENTE :</strong>
            <p>{cliente.endereco}</p>
            <strong>EMAIL DO CLIENTE :</strong>
            <p>{cliente.email}</p>
            <strong>SEXO DO CLIENTE :</strong>
            <p>{cliente.sexo}</p>
            <strong>NASCIMENTO DO CLIENTE :</strong>
            <p>{cliente.nacimento}</p>
            <Link to="/cliente-editar" onClick={()=>salvar(cliente.id)} className="button2" type="button">
              <FaWhmcs size={20} color="#a8a8b3"></FaWhmcs>
            </Link>
            <button onClick={()=>handleDeleteProd(cliente.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
            </button>
            
            
          </li>
        ))}
      </ul>
    </div>
  );
  }