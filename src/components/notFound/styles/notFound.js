import styled from "styled-components/macro";
import { color } from "../../../utils/colors";

export const Container = styled.div`
  background-color: ${color.white};
  margin: 2.5vh 5vh;
`;

export const Card = styled.div`
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  max-width: 1000px;
  border-radius: 10px;
  height: 90vh;
  margin: 0 auto;
  padding: 10px;
  background: radial-gradient(circle, rgba(92, 39, 251, 1) 0%, rgba(112, 71, 247, 1) 100%);
  display: flex;
  justify-content: center;
`;
