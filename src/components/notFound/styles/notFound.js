import styled from "styled-components/macro";

export const Container = styled.div``;

export const Card = styled.div`
  max-width: 1000px;
  border-radius: 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Img = styled.img`
  align-self: center;
  max-width: 100%;
  height: 50vh;
  margin-top: 50px;
  margin-left: -50px;

  @media (max-width: 600px) {
    margin-left: -20px;
  }
`;

export const Text = styled.h1`
  font-size: 35px;
  color: ${(props) => props.theme.feature_color};
  padding: 20px;
  color: #222;
  align-self: center;
  text-align: center;
  font-weight: normal;
`;
