import React, { useState,useEffect } from "react";
import "./style.css";
import logoImg from "../../../assets/logo.jpg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../../services/api";

export default function NewIncident() {
  const [resultado_esperado, setResultado_esperado] = useState("");
  const [itemResultadoEsperado, setItemResultadoEsperado] = useState([]);
  const [quest, setQuest] = useState("");
  const [isCheck, setIsCheck] = useState("");
  const history = useHistory();
  const idItem = localStorage.getItem("idItem");

  useEffect(() => {
    api.get("/resultado-esperado").then((response) => {
      setItemResultadoEsperado(response.data);
    });
  }, []);
  async function edt(e) {
    e.preventDefault();

    const data = {
      resultado_esperado,
      quest,
      isCheck
    };

    try {
      await api.put(`check-list/${idItem}`, data);

      history.push("/check-list");
    } catch (error) {
      alert("Erro ao editar Item");
    }
  }

  return (
    <div>
    <div className="new-vaga-container">
      <div className="conteiner">
        <section>
          <img src={logoImg} alt="Controle de Estoque" />
          <h1>Editar Item</h1>
          <p>
            Edite o Item e altere o valor de que voce precisar.
          </p>
          <Link className="back-link" to="/check-list">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={edt}>
        <select value={resultado_esperado} onChange={(e) => setResultado_esperado(e.target.value)}>
              <option value="">Resultado Esperado</option>
             { itemResultadoEsperado.map((item) => (<option key={item.resultado_esperado} value={item.resultado_esperado}>{item.resultado_esperado}</option>))}
            </select>
            <textarea
              value={quest}
              onChange={(e) => setQuest(e.target.value)}
              placeholder="Pergunta"
            />
            <select value={isCheck} onChange={(e) => setIsCheck(e.target.value)}>
              <option value="">Aderência</option>
              <option value="Sim">Sim</option>
              <option value="Nao">Nao</option>
              <option value="N.A">N.A</option>
             </select>
            <button className="button" type="submit">
              Editar
            </button>
        </form>
      </div>
    </div>
    </div>
  );
}
