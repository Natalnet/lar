import styled from "styled-components";
import { darken } from "polished";

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

export const Filter = styled.div`
  justify-content: center;
  display: flex;

  form {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;

    input {
      background: rgba(0, 0, 0, 0.1);
      width: 30%;
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
        display: none;
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

export const ModalContainer = styled.div`
  display: ${({ open }) => (open ? "block" : "none")}; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 150px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.1); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.5); /* Black w/ opacity */

  div {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    background: #fff;
    width: 30%;
    height: 50%;
    border-radius: 18px;

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      button {
        width: 90%;
        height: 54px;
        background: #f64c75;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;

        transition: background 0.3s;

        &:hover {
          background: ${darken(0.1, "#f64c75")};
        }
      }
      div {
        width: 100%;
        margin: 20px auto;

        div {
          button {
            width: 90%;
            height: 54px;
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
          }
        }
      }
    }
  }
`;
