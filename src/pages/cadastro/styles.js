import styled from "styled-components";

import { darken } from "polished";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  form {
    display: flex;
    margin: 200px auto;
    flex-direction: column;

    input {
      background: rgba(0, 0, 0, 0.1);
      width: 540px;
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    button {
      margin: 5px 0 0;
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
    }
  }
`;
