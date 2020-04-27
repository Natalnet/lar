import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { Form, Input } from "@rocketseat/unform";
import Pagination from "@material-ui/lab/Pagination";

import api from "~/services/api";

import Modal from "./Modal";

import { Filter, Button, ButtonBorrowed, Tr, Container } from "./styles";

export default function Orders() {
  const [item, setItem] = useState([]);
  const [page, setPage] = useState(1);
  const [numberPages, setNumberPages] = useState(1);
  const [name, setName] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalItemId, setModalItemId] = useState("");
  const [modalName, setmodalName] = useState("");
  const [modalAmount, setmodalAmount] = useState("");

  useEffect(() => {
    async function loadBorrowed() {
      const response = await api.get(
        `/borrowed?page=${page}${name ? "&name=" + name : ""}`
      );
      setItem(response.data);
    }

    async function loadNumberPages() {
      const response = await api.get(`/borrowed?${name ? "name=" + name : ""}`);

      setNumberPages(1 + parseInt(response.data.length / 10));
    }
    loadNumberPages();

    loadBorrowed();
  }, [name, page]);

  async function filterInvetory({ name }) {
    if (name) {
      const response = await api.get(`/borrowed?name=${name}`);

      setItem(response.data);
    } else {
      const response = await api.get(`/borrowed`);

      setItem(response.data);
    }
  }

  async function returneItem({ item_id, amount, name }) {
    setModalItemId(item_id);
    setmodalAmount(amount);
    setmodalName(name);
    setOpen(!open);
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  const changeName = (e) => {
    setName(e.target.value);
    setPage(1);
  };

  return (
    <React.Fragment>
      <Title>Seus empréstimos</Title>
      <Filter>
        <Form onSubmit={filterInvetory}>
          <Input name="name" placeholder="Nome do item" onChange={changeName} />
          <Button type="submit">Filtrar</Button>
        </Form>
      </Filter>
      <Modal
        item_id={modalItemId}
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
                        <Input readOnly name="name" value={item.item.name} />
                        <Input readOnly name="amount" value={item.amount} />
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
      </Tr>
      <Container>
        <div>
          <Pagination count={numberPages} page={page} onChange={handleChange} />
        </div>
      </Container>
    </React.Fragment>
  );
}
