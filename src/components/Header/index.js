import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import logo from "~/assets/logo-purple.svg";
import defaultPerfil from "~/assets/perfil.png";

import { Container, Content, Profile } from "./styles";

export default function Header() {
  const profile = useSelector((state) => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Laboratório de Automoção e Robótica" />
          <Link to="/">Dashboard</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <p>{profile.project}</p>
              <Link to="/perfil">Meu perfil</Link>
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
