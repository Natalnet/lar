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

import { Filter, Button, ButtonBorrowed, Borrowed } from "./styles";

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
    async function loadInvetory() {
      const response = await api.get("/invetory");
      setItem(response.data);
    }

    loadInvetory();
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

  async function userBorrowed({ itemId, amount }) {
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

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Inventário do LAR</Title>
      <Filter>
        <Form onSubmit={filterInvetory}>
          <Input name="name" placeholder="Nome do item" />
          <Input name="location" placeholder="Localização do item" />
          <Button type="submit">Filtrar</Button>
        </Form>
      </Filter>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Localização</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Quantidade disponível para empréstimo</TableCell>
            <TableCell>Quantidade em empréstimo</TableCell>
            <TableCell>Realizar empréstimo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.amount_available}</TableCell>
              <TableCell>{item.borrowed_amount}</TableCell>
              <TableCell>
                <Borrowed>
                  <Form onSubmit={userBorrowed}>
                    <div>
                      <Input
                        name="itemId"
                        type="number"
                        value={item.id}
                        readOnly={true}
                      />
                    </div>
                    <Input
                      name="amount"
                      type="number"
                      placeholder="Número de itens"
                    />

                    <ButtonBorrowed type="submit">
                      Realizar empréstimo
                    </ButtonBorrowed>
                  </Form>
                </Borrowed>
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
