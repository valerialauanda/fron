import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2, FiEdit } from "react-icons/fi";
import "./home.css";
import "./main.css";
import "./util.css";
import api from "../../../services/api";

import logo from "../../../assets/logo.jpg";

export default function Home() {

  const history = useHistory();

  const [itemCheckList, setItemCheckList] = useState([]);
  const [itemTamanho, setItemTamanho] = useState(0);
  const empresaName = localStorage.getItem("nomeEmpresa");
  var percentual = 0;
  var itemTamanhofim = 0
  var yes = 0;
  var not = 0;

  useEffect(() => {
    api.get("/check-list").then((response) => {
      setItemTamanho(response.data.length);
      setItemCheckList(response.data);
    });
  }, []);

  itemTamanhofim = itemTamanho;

  itemCheckList.map( (i) => {
    if (i.isCheck === 'Sim') {
      yes = yes + 1
    }else if (i.isCheck === 'Nao'){
      not = not + 1
    } else {
      itemTamanhofim = itemTamanhofim -1
    }
    return i;
  })
  percentual = (yes*100) / itemTamanhofim

  async function handleLogout() {
    localStorage.clear();
    history.push("/");
  }
  async function handleDelete(id) {
    try {
      await api.delete(`/check-list/${id}`);

      setItemCheckList(itemCheckList.filter((item) => item.id !== id));
    } catch (erro) {
      alert("Erro ao deletar item, tente novamente.");
    }
  }
  function salvar(id){
    localStorage.setItem('idItem', id);
  }
  return (
    <div className="profile-container">
      <header>
        <div className="divTest">
          <img src={logo} alt="Controle de Estoque" />
          <span>Bem vinda, {empresaName}</span>
        </div>
        <Link className="button" to="/novo-check-list">
          Novo Item
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041"></FiPower>
        </button>
      </header>
      <h1>GRH - O Percentual de Aderência é de {Math.round(percentual)}%</h1>

      <div className="limiter">
        <div className="container-table100">
          <div className="wrap-table100">
            <div className="table100">
              <table>
                <thead>
                  <tr className="table100-head">
                    <th className="column1">Resultado esperado</th>
                    <th className="column2">Pergunta</th>
                    <th className="column3">Verificado</th>
                    <th className="column4">Editar</th>
                    <th className="column5">Excluir</th>
                  </tr>
                </thead>  
                <tbody>
                  {itemCheckList.map((item) => (
                    <tr key={item.id}>
                      <td className="column1"><p>{item.resultado_esperado}</p></td>
                      <td className="column2"><p>{item.quest}</p></td>
                      <td className="column3"><p>{item.isCheck}</p></td>
                      <td className="column4"><Link to="/edit-check-list" onClick={()=>salvar(item.id)}><FiEdit color={"#36304a"} size={30}/></Link></td>
                      <th className="column5"><button onClick={() => handleDelete(item.id)} ><FiTrash2 color={"#36304a"} size={30}/></button></th>
                    </tr>
                  ))}
                </tbody>
              </table>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
