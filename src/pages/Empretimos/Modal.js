import React from "react";

import api from "~/services/api";
import history from "~/services/history";

import { ModalContainer } from "./styles";
import { toast } from "react-toastify";

import { Form } from "@rocketseat/unform";

export default function Modal({ item_id, amount, name, open, setOpen }) {
  async function handleReturn() {
    try {
      const response = await api.put(`/borrowed/${item_id}`);

      console.log(response);

      toast.success("Devolução feita com sucesso");
      history.push("/lar/inventario");
    } catch (err) {
      toast.error("Erro ao fazer devolução");
    }
  }

  return (
    <ModalContainer open={open}>
      <div>
        <Form onSubmit={handleReturn}>
          <div>
            <h1>Confime a sua devolução</h1>
            <p>
              Nome do item: <strong>{name}</strong>
            </p>
            <p>
              Quantidade a ser devolvida: <strong>{amount}</strong>
            </p>
          </div>
          <div>
            <div>
              <button type="submit">Confirmar devolução</button>
            </div>
            <button type="button" onClick={() => setOpen(!open)}>
              Cancelar devolução
            </button>
          </div>
        </Form>
      </div>
    </ModalContainer>
  );
}
