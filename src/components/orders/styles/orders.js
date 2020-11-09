import styled from "styled-components/macro";
import { color } from "../../../utils/colors";

export const Container = styled.div`
  background: ${color.whiteLight};
  padding: 10px;

  @media (min-width: 700px) {
    padding: 30px;
  }
`;

export const Card = styled.div`
  background-color: ${color.whiteLight};
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  max-width: 1000px;
  border-radius: 10px;
  margin: 0 auto;
  padding: 10px;

  @media (min-width: 700px) {
    padding: 50px;
  }
`;

export const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 30px 0;
`;

export const Text = styled.p`
  font-size: 16px;
  margin: 5px;
`;

export const SubText = styled.p`
  font-size: 12px;
  color: gray;
  margin: 5px;
`;

export const Group = styled.div`
  margin: ${({ margingroup }) => (margingroup ? margingroup : "10px 0")};
  border-radius: 5px;
`;

export const Item = styled.div`
  border: 1px solid ${color.whiteDarkLight};
  padding: 20px 10px;
  margin: 10px 0;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  justify-content: space-between;

  &:hover {
    background: ${color.whiteLight};
  }

  @media (max-width: 500px) {
    div:nth-of-type(1) {
      width: 100%;
      margin-bottom: 20px;
    }
    ${Text} {
      font-size: 14px;
    }
  }
`;

export const InnerItem = styled.div``;
