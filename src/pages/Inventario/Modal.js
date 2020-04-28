import React from "react";

import api from "~/services/api";
import history from "~/services/history";

import { ModalContainer } from "./styles";
import { toast } from "react-toastify";

import { Form } from "@rocketseat/unform";

export default function Modal({ itemId, amount, name, open, setOpen }) {
  async function handleBorrowed() {
    try {
      const response = await api.post("/borrowed", {
        item_id: itemId,
        amount,
      });
      console.log(response);
      toast.success(`Você realizou um empréstimo. Quantidade: ${amount}`);

      history.push("/emprestimos");
    } catch (err) {
      toast.error(
        `Erro ao realizar  empréstimo. Verifique se a quantidade desejada está dísponivel ou se você já não possui um empréstimo com esse item`
      );
    }
  }

  return (
    <ModalContainer open={open}>
      <div>
        <Form onSubmit={handleBorrowed}>
          <div>
            <h1>Confime seu empréstimo</h1>
            <p>
              Nome do item: <strong>{name}</strong>
            </p>
            <p>
              Quantidade a ser emprestada: <strong>{amount}</strong>
            </p>
          </div>
          <div>
            <div>
              <button type="submit">Confirmar empréstimo</button>
            </div>
            <button type="button" onClick={() => setOpen(!open)}>
              Cancelar empréstimo
            </button>
          </div>
        </Form>
      </div>
    </ModalContainer>
  );
}
