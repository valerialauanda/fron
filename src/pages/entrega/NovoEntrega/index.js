import React, { useState } from 'react';
import "./style.css"
import logoImg from "../../../assets/logo.jpg";
import { Link , useHistory } from "react-router-dom"
import {FiArrowLeft} from "react-icons/fi"
import api from "../../../services/api"
import { mask, unMask } from 'remask'
import Modal from "../../../components/Modal";

export default function EntregaNew() {
  const [IdPedido, setIDPedido] = useState("")
  const [dataEntrega,setdataEntrega] = useState("")
  const [observacao,setobservacao] = useState("") 
  
  const [modalVisible, setModalVisible] = useState(false);
  const [mensagemModal, setmensagemModal] = useState("");
  
  const history = useHistory()
  const empresaId = localStorage.getItem("empresaId");

  async function newEntrega(e){
    e.preventDefault()

    if (IdPedido === null || IdPedido === "") {
      setmensagemModal("Preencha o Id do pedido");
      setModalVisible(true);
      return
    }
    if (dataEntrega === null || dataEntrega === "") {
      setmensagemModal("Preencha a data de entrega");
      setModalVisible(true);
      return
    }
    if (observacao  === null || observacao === "") {
      setmensagemModal("Preencha a Observacao");
      setModalVisible(true);
      return
    }

    const data = {
      IdPedido,
      dataEntrega,
      observacao
    }

    try {
      await api.post("entrega",data,{
        headers : {
          Authorization : empresaId
        }
      })

      history.push("/entregas")
    } catch (error) {
      alert("Erro ao cadastrar entrega")
    }

  }

  return (
    <div>
      {modalVisible ? <Modal onClose={() => setModalVisible(false)} title={mensagemModal} /> : null}
      <div className="new-vaga-container">
      <div className="conteiner">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Marcar nova entrega</h1>
          <p>
            Selecione o pedido e a data desejada para efetuar a entrega.
          </p>
          <Link className="back-link" to="/entregas">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={newEntrega}>
            <input 
              value={IdPedido}
              type="number"
              onChange={e => setIDPedido(e.target.value)}
              placeholder="Número do pedido"/>
            <input 
              value={dataEntrega}
              onChange={e => setdataEntrega(mask(unMask(e.target.value),['99/99/9999']))}
              placeholder="Data da entrega"/>
            <input 
              value={observacao}
              onChange={e => setobservacao(e.target.value)}
              placeholder="Observação sobre a entrega"/>
            
        <button className="button" type="submit">Agendar</button>
        </form>
      </div>
    </div>
    </div>
    
  );
}
