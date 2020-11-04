import styled from "styled-components/macro";
import { color } from "../../../utils/colors";

export const Container = styled.div`
  background-color: ${color.white};
  padding: 10px;

  @media (min-width: 700px) {
    padding: 30px;
  }
`;

export const Card = styled.div`
  background-color: ${color.whiteLight};
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  max-width: 1000px;
  border-radius: 10px;
  margin: 0 auto;
  padding: 10px;

  @media (min-width: 700px) {
    padding: 50px;
  }
`;
