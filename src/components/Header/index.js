import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import logo from "~/assets/name.png";

import defaultPerfil from "~/assets/perfil.png";

import { Container, Content, Profile } from "./styles";

export default function Header() {
  const profile = useSelector((state) => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/lar">
            <img src={logo} alt="Laboratório de Automoção e Robótica" />
          </Link>
          <Link to="/lar/inventario">Inventário</Link>
          <Link to="/lar/emprestimos">Meus emprestimos</Link>
          <Link to="/lar/cadastro">Cadastrar item</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <p>{profile.project}</p>
              <Link to="/lar/perfil">Meu perfil</Link>
            </div>
            <img
              src={profile.avatar ? profile.avatar.url : defaultPerfil}
              alt="Pedro henrique"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
