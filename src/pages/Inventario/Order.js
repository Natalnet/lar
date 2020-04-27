import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { Form, Input } from "@rocketseat/unform";

import api from "~/services/api";

import Modal from "./Modal";

import { toast } from "react-toastify";

import {
  Filter,
  Button,
  ButtonBorrowed,
  Borrowed,
  Container,
  Tr,
} from "./styles";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Orders() {
  const [item, setItem] = useState([]);
  const [page, setPage] = useState(1);
  const [numberPages, setNumberPages] = useState(1);
  const [name, setName] = useState(null);
  const [location, setLocation] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalItemId, setModalItemId] = useState("");
  const [modalName, setmodalName] = useState("");
  const [modalAmount, setmodalAmount] = useState("");

  useEffect(() => {
    async function loadInvetory() {
      const response = await api.get(
        `/invetory?page=${page}${location ? "&location=" + location : ""}${
          name ? "&name=" + name : ""
        }`
      );
      setItem(response.data);
    }

    async function loadNumberPages() {
      const response = await api.get(
        `/invetory?${location ? "location=" + location : ""}${
          name ? "&name=" + name : ""
        }`
      );

      setNumberPages(1 + parseInt(response.data.length / 10));
    }

    loadInvetory();
    loadNumberPages();
  }, [location, name, page]);

  async function filterInvetory() {
    if (name) {
      const response = await api.get(`/invetory?name=${name}&page=${page}`);

      setItem(response.data);
    } else if (location) {
      const response = await api.get(
        `/invetory?location=${location}&page=${page}`
      );

      setItem(response.data);
    } else if (name && location) {
      const response = await api.get(
        `/invetory?name=${name}&location=${location}&page=${page}`
      );

      setItem(response.data);
    } else {
      const response = await api.get(`/invetory?page=${page}`);

      setItem(response.data);
    }

    setPage(1);
  }

  async function userBorrowed({ itemId, amount, name }) {
    if (amount <= 0) {
      toast.error("Selecione uma quantiade maior que 0");
    } else {
      setModalItemId(itemId);
      setmodalAmount(amount);
      setmodalName(name);
      setOpen(!open);
    }
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  const changeName = (e) => {
    setName(e.target.value);
    setPage(1);
  };

  const changeLocation = (e) => {
    setLocation(e.target.value);
    setPage(1);
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Inventário do LAR</Title>
      <Filter>
        <Form onSubmit={filterInvetory}>
          <Input name="name" placeholder="Nome do item" onChange={changeName} />
          <Input
            name="location"
            placeholder="Localização do item"
            onChange={changeLocation}
          />
          <Button type="submit">Filtrar</Button>
        </Form>
      </Filter>
      <Modal
        itemId={modalItemId}
        amount={modalAmount}
        name={modalName}
        open={open}
        setOpen={setOpen}
      />
      <Tr>
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
                <TableCell>
                  <strong>{item.name}</strong>
                </TableCell>

                <TableCell>
                  <strong>{item.location}</strong>
                </TableCell>
                <TableCell>
                  <strong>{item.amount}</strong>
                </TableCell>
                <TableCell>
                  <strong>{item.amount_available}</strong>
                </TableCell>
                <TableCell>
                  <strong>{item.borrowed_amount}</strong>
                </TableCell>
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

                        <Input name="name" value={item.name} readOnly={true} />
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
      </Tr>
      <Container>
        <div className={classes.root}>
          <Pagination count={numberPages} page={page} onChange={handleChange} />
        </div>
      </Container>
    </React.Fragment>
  );
}
