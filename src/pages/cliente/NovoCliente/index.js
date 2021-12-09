import React, { useState } from "react";
import "./style.css";
import logoImg from "../../../assets/logo.jpg"
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../../services/api";
import Modal from "../../../components/Modal";

import { mask, unMask } from "remask";

export default function ClienteNew() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [numero, setNumero] = useState("");
  const [endereco, setEndereco] = useState("");
  const [email, setEmail] = useState("");
  const [sexo, setSexo] = useState("");
  const [nacimento, setNacimento] = useState("");
  const history = useHistory();
  const empresaId = localStorage.getItem("empresaId");

  const [modalVisible, setModalVisible] = useState(false);
  const [mensagemModal, setmensagemModal] = useState("");

  async function newCliente(e) {
    e.preventDefault();

    if (nome === null || nome === "") {
      setmensagemModal("Preencha o nome do Cliente");
      setModalVisible(true);
      return;
    }
    if (cpf === null || cpf === "") {
      setmensagemModal("Preencha o cpf Do Comprador");
      setModalVisible(true);
      return;
    }
    if (numero === null || numero === "") {
      setmensagemModal("Preencha o Numero");
      setModalVisible(true);
      return;
    }
    if (endereco === null || endereco === "") {
      setmensagemModal("Preencha a Endereço");
      setModalVisible(true);
      return;
    }
    if (email === null || email === "") {
      setmensagemModal("Preencha o Email");
      setModalVisible(true);
      return;
    }
    if (sexo === null || sexo === "") {
      setmensagemModal("Preencha o sexo");
      setModalVisible(true);
      return;
    }
    if (nacimento === null || nacimento === "") {
      setmensagemModal("Preencha a data de nascimento");
      setModalVisible(true);
      return;
    }

    const data = {
      nome,
      cpf,
      numero,
      endereco,
      email,
      sexo,
      nacimento,
    };

    try {
      await api.post("clientes", data, {
        headers: {
          Authorization: empresaId,
        },
      });

      history.push("/clientes");
    } catch (error) {
      alert("Erro ao cadastrar Cliente");
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
            <img src={logoImg} alt="Be The Hero" />
            <h1>Cadastrar Cliente</h1>
            <p>Cadastre o cliente e torne membro da nossa equipe.</p>
            <Link className="back-link" to="/clientes">
              <FiArrowLeft size={16} color="#E02041" />
              Voltar para Home
            </Link>
          </section>
          <form onSubmit={newCliente}>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do Cliente"
            />
            <input
              value={cpf}
              onChange={(e) =>
                setCpf(mask(unMask(e.target.value), ["999.999.999-99"]))
              }
              placeholder="CPF do Cliente"
            />
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
              placeholder="Email do Cliente"
            />
            <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
              <option value="">Sexo do Cliente</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
            <input
              value={nacimento}
              onChange={(e) =>
                setNacimento(mask(unMask(e.target.value), ["99/99/9999"]))
              }
              placeholder="Data de Nascimento do Cliente"
            />
            <button className="button" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
