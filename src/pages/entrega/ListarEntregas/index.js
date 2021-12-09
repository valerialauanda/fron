import React,{ useState, useEffect } from "react";
import  {Link,useHistory} from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import { FaWhmcs } from "react-icons/fa"

import "./style.css";

import logoImg from "../../../assets/logo.jpg"

import api from "../../../services/api";

export default function Entrega() {

  const [entrega, setEntrega] = useState([]);

  const history = useHistory()

  const empresaName = localStorage.getItem("nomeEmpresa");
  const empresaId = localStorage.getItem("empresaId");


  useEffect(() => {
    api
      .get("profile/entrega", {
        headers: {
          Authorization: empresaId
        }
      })
      .then(response => {
        setEntrega(response.data);
      });
  }, [empresaId]);

  async function handleDeleteProd(id){
      try {
        await api.delete(`entrega/${id}`,{
            headers: {
              Authorization: empresaId
            }
          })

          setEntrega(entrega.filter(entrega => entrega.id !== id))

      } catch (erro) {
          alert('Erro ao deletar Entrega, tente novamente.')
      }
  }

  function handleLogout(){

      localStorage.clear()
    history.push('/')
  }
  function salvar(id){
    localStorage.setItem('idEntrega', id);
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Controle de Estoque" />
        <span>Bem vinda, {empresaName}</span>
        <Link className="button" to="/painel-vendedor">
          Menu
        </Link>
        <Link className="button" to="/entrega-novo">
          Agendar nova entrega
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041"></FiPower>
        </button>
      </header>
      <h1>Entregas</h1>

      <ul>
        {
        entrega.map(entrega => (
          <li key={entrega.id}>
            <strong>NUMERO DO PEDIDO :</strong>
            <p>{entrega.IdPedido}</p>
            <strong>DATA DA ENTREGA :</strong>
            <p>{entrega.dataEntrega}</p>
            <strong>OBSERVAÇÃO :</strong>
            <p>{entrega.observacao}</p>
            
            <Link to="/entrega-editar" onClick={()=>salvar(entrega.id)} className="button2" type="button">
              <FaWhmcs size={20} color="#a8a8b3"></FaWhmcs>
            </Link>
            <button onClick={()=>handleDeleteProd(entrega.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
            </button>
            
            
          </li>
        ))}
      </ul>
    </div>
  );
  }