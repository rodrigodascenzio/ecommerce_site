import styled from "styled-components/macro";
import { color } from "../../../utils/colors";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

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
  max-width: 400px;
  border-radius: 10px;
  margin: 0 auto;
  padding: 10px;

  @media (min-width: 700px) {
    max-width: 1000px;
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    padding: 50px;
  }
`;

export const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  @media (min-width: 700px) {
    margin-left: 30px;
    border: 2px solid ${color.white};
  }
`;

export const Photo = styled.img`
  border: 1px solid ${color.white};
  border-radius: 5px;
  height: 300px;
  max-height: 100%;
  cursor: pointer;
  width: 100%;
  @media (min-width: 700px) {
    height: auto;
  }
`;

export const Group = styled.div`
  margin: ${({ margingroup }) => (margingroup ? margingroup : "10px 0")};
  @media (max-width: 700px) {
    justify-content: center;
  }
`;

export const SubGroup = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? `${direction}; align-items: center;` : "column")};
  border-radius: 5px;
  border: ${({ bordersub }) => (bordersub ? bordersub : "")};
  margin: ${({ margin }) => (margin ? margin : "5px 0 0 0")};

  label {
    display: flex;
    flex-direction: row;

    .subgroup {
      margin: 0px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 5px 15px 5px 5px;
    }

    input {
      outline: none;
    }

    &:hover {
      background: ${color.white};
    }
  }
`;

export const Title = styled.p`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

export const Price = styled.p`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: ${color.greenDark};
`;

export const SubTitle = styled.p`
  display: flex;
  align-items: center;
  font-size: 20px;
  margin: 0;
  user-select: none;
`;

export const Text = styled.p`
  display: flex;
  align-items: center;
  font-size: 16px;
  user-select: none;
  line-height: normal;
`;

export const SubText = styled.p`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin: 0;
  user-select: none;
  line-height: normal;
`;

export const Button = styled.button`
  border-radius: 4px;
  background: ${(props) => props.theme.background_color};
  border: 2px solid ${(props) => props.theme.primary_color};
  white-space: nowrap;
  padding: 10px 20px;
  color: #fff;
  font-size: 16px;
  outline: none;
  align-self: center;
  margin: 20px 10px 0 10px;
  cursor: pointer;
  &:hover {
    background: #fff;
    color: ${(props) => props.theme.primary_color};
  }
`;

export const Input = styled.input`
  margin: 10px;
`;

export const PlusIcon = styled(AiFillPlusCircle)`
  border: 0;
  color: gray;
  padding: 5px;
  border-radius: 5px;
  margin: 0 8px;
  z-index: 10;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  align-items: center;
`;

export const MinusIcon = styled(AiFillMinusCircle)`
  border: 0;
  color: gray;
  padding: 5px;
  border-radius: 5px;
  margin: 0 8px;
  z-index: 10;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  align-items: center;
`;
