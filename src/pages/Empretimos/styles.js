import styled from "styled-components";
import { darken } from "polished";

export const Filter = styled.div`
  form {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;

    input {
      background: rgba(0, 0, 0, 0.1);
      width: 20%;
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #000;
      margin: 0 20px 10px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.6);
      }
    }

    div {
      input {
        display: none;
      }
    }
  }
`;

export const Button = styled.button`
  width: 20%;
  margin: 0 20px 10px;
  height: 44px;
  background: #3b9eff;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;

  transition: background 0.3s;

  &:hover {
    background: ${darken(0.1, "#3b9eff")};
  }
`;

export const Borrowed = styled.div`
  form {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;

    input {
      background: rgba(0, 0, 0, 0.1);
      width: 70%;
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #000;
      margin: 0 20px 10px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.6);
        font-size: 12px;
      }
    }

    div {
      input {
      }
    }
  }
`;

export const ButtonBorrowed = styled.button`
  width: 60%;
  margin: 0 20px 10px;
  height: 44px;
  background: #3b9eff;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;

  transition: background 0.3s;

  &:hover {
    background: ${darken(0.1, "#3b9eff")};
  }
`;

export const Container = styled.div`
  div {
    display: flex;
    justify-content: center;
    margin: 15px 0;
  }
`;

export const Tr = styled.div`
  table {
    tbody {
      tr {
        background: #fff;

        &:hover {
          background: ${darken(0.1, "#fff")};
        }
      }
    }
  }
`;
