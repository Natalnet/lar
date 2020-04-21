import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { Form, Input } from "@rocketseat/unform";

import api from "~/services/api";

import { toast } from "react-toastify";

import history from "~/services/history";

import { Filter, Button, ButtonBorrowed } from "./styles";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const [item, setItem] = useState([]);

  useEffect(() => {
    async function loadBorrowed() {
      const response = await api.get("/borrowed");
      setItem(response.data);
    }

    loadBorrowed();
  }, []);

  async function filterInvetory({ name, location }) {
    if (name) {
      const response = await api.get(`/invetory?name=${name}`);

      setItem(response.data);
    } else if (location) {
      const response = await api.get(`/invetory?location=${location}`);

      setItem(response.data);
    } else if (name && location) {
      const response = await api.get(
        `/invetory?name=${name}&location=${location}`
      );

      setItem(response.data);
    } else {
      const response = await api.get(`/invetory`);

      setItem(response.data);
    }
  }

  async function returneItem({ item_id }) {
    try {
      const response = await api.put(`/borrowed/${item_id}`);

      console.log(response);

      toast.success("Devolução feita com sucesso");
      history.push("/inventario");
    } catch (err) {
      toast.error("Erro ao fazer devolução");
    }
  }

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Seus empréstimos</Title>
      <Filter>
        <Form onSubmit={filterInvetory}>
          <Input name="name" placeholder="Nome do item" />
          <Button type="submit">Filtrar</Button>
        </Form>
      </Filter>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Quantidade em empréstimo</TableCell>
            <TableCell>Realizar devolução</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.item.name}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>
                <Filter>
                  <Form onSubmit={returneItem}>
                    <div>
                      <Input readOnly name="item_id" value={item.id} />
                    </div>
                    <ButtonBorrowed type="submit">
                      Realizar devolução
                    </ButtonBorrowed>
                  </Form>
                </Filter>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Visualizar mais itens
        </Link>
      </div>
    </React.Fragment>
  );
}
