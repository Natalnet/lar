import React from "react";
import { useSelector } from "react-redux";
import { Form, Input } from "@rocketseat/unform";
import { toast } from "react-toastify";

import { Container } from "./styles";

import api from "~/services/api";

export default function cadastro() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const administrador = useSelector(
    (state) => state.user.profile.administrador
  );

  if (!administrador) {
    return toast.error("Apenas administradores podem cadastrar itens");
  }

  async function handleSubmit({ name, location, amount }) {
    try {
      const response = await api.post("/invetory", {
        name,
        location,
        amount,
        amount_available: amount,
        borrowed_amount: 0,
      });

      console.log(response);
      toast.success("Item cadastrado com sucesso!");
    } catch (err) {
      toast.error("Nome já existente!");
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome do item" />
        <Input name="location" placeholder="Localização do item" />
        <Input name="amount" type="number" placeholder="Quantidade" />

        <button type="submit">Cadastrar item</button>
      </Form>
    </Container>
  );
}
