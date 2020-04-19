import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

import api from "~/services/api";

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

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Inventário do LAR</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Localização</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Quantidade disponível para emprestimo</TableCell>
            <TableCell>Quantidade em emprestimo</TableCell>
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
