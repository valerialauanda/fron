import React, { useState } from "react";
import "./style.css";
import logoImg from "../../../assets/logo.jpg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { mask, unMask } from "remask";

import api from "../../../services/api";

import Modal from "../../../components/Modal";

export default function ClientesEdit() {
  const [numero, setNumero] = useState("");
  const [endereco, setEndereco] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const idClie = localStorage.getItem("idClie");

  const [modalVisible, setModalVisible] = useState(false);
  const [mensagemModal, setmensagemModal] = useState("");

  async function edt(e) {
    e.preventDefault();

    if (numero === null || numero === "") {
      setmensagemModal("Preencha o numero do cliente");
      setModalVisible(true);
      return;
    }
    if (endereco === null || endereco === "") {
      setmensagemModal("Preencha o Endereço");
      setModalVisible(true);
      return;
    }
    if (email === null || email === "") {
      setmensagemModal("Preencha o Email");
      setModalVisible(true);
      return;
    }

    const data = {
      numero,
      endereco,
      email,
    };

    try {
      await api.put(`clientes/${idClie}`, data);

      history.push("/clientes");
    } catch (error) {
      alert("Erro ao Editar Cliente");
    }
  }

  return (
    <div>
      {modalVisible ? (
        <Modal onClose={() => setModalVisible(false)} title={mensagemModal} />
      ) : null}
      <div className="new-vaga-container">
        <div className="conteiner">
          <section>
            <img src={logoImg} alt="Controle de Estoque" />
            <h1>Editar Cliente</h1>
            <p>Edite o Cliente e mudando suas informaçoes.</p>
            <Link className="back-link" to="/clientes">
              <FiArrowLeft size={16} color="#E02041" />
              Voltar para Home
            </Link>
          </section>
          <form onSubmit={edt}>
            <input
              value={numero}
              onChange={(e) =>
                setNumero(mask(unMask(e.target.value), ["(99) 9 9999-9999"]))
              }
              placeholder="Telefone do Cliente"
            />
            <input
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Endereço do Cliente"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <button className="button" type="submit">
              Editar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
