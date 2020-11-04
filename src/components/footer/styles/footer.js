import styled from "styled-components";
import { color } from "../../../utils/colors";

export const Container = styled.div`
  padding: 20px 0;
  margin: 50px;
  border-top: 2px solid ${color.whiteDarkLight};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
  /* background: red; */
`;

export const Column = styled.div`
  /* background: black; */
  margin: 10px;
`;

export const Row = styled.div`
  flex-wrap: wrap;
  display: flex;
  /* background: yellow; */
  align-items: center;
`;

export const Link = styled.a`
  color: ${color.whiteDark};
  margin: 10px;
  font-size: 14px;
  text-decoration: none;
  /* background: orange; */
  &:hover {
    color: #ff9c00;
    transition: 200ms ease-in;
  }
`;

export const Title = styled.p`
  font-size: 16px;
  color: ${color.whiteDark};
  margin: 10px;
  font-weight: bold;
`;

export const Text = styled.p`
  font-size: 12px;
  align-self: center;
  /* background: green; */
  color: ${color.whiteDark};
  margin: 10px;
`;
