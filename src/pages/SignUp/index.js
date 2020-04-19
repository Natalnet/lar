import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";

import logo from "~/assets/logo-01.png";

import { signUpRequest } from "~/store/modules/auth/actions";

const schema = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
  password: Yup.string()
    .min(8, "No mínimo 8 caracteres")
    .required("A senha é obrigatória"),
  project: Yup.string().required("O Projeto é Obrigatório"),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password, project }) {
    dispatch(signUpRequest(name, email, password, project));
  }
  return (
    <>
      <img src={logo} alt="Natalnet" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome e sobrenome" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />
        <Input name="project" placeholder="Projeto que você faz parte" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
