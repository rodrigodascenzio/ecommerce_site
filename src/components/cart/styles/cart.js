import styled from "styled-components/macro";
import { color } from "../../../utils/colors";
import { MdDelete } from "react-icons/md";
export const Container = styled.div`
  background-color: ${color.white};
  padding: 10px;

  @media (min-width: 700px) {
    padding: 30px;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
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

export const Products = styled.div`
  background-color: white;
  display: flex;
  margin: 5px;
  flex-direction: column;
  border: 1px solid ${color.whiteDarkLight};
  border-radius: 5px;
  select {
    width: fit-content;
    margin: 10px;
  }
`;

export const ProductsCollumn = styled(Products)`
  > input {
    width: fit-content;
  }
  flex-direction: column;
`;

export const Product = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  padding: 5px;

  :hover {
    background: ${color.white};
  }
  cursor: pointer;
`;

export const DeleteIcon = styled(MdDelete)`
  color: white;
  padding: 5px;
  border-radius: 5px;
  background: rgba(92, 39, 251, 1);
  margin: 5px;
  z-index: 10;
  cursor: pointer;
  max-inline-size: 3%;
  min-inline-size: 3%;
  &:hover {
    background-color: rgba(92, 39, 251, 0.7);
  }
  align-items: center;
`;

export const Quantity = styled.p`
  margin: 0;
  box-sizing: border-box;
  padding: 5px;
  font-weight: bold;
  text-align: center;
  font-size: ${({ fontsize }) => (fontsize ? `${fontsize}px` : "16px")};
  min-inline-size: ${({ minsize }) => (minsize ? `${minsize}%` : "10%")};
  @media (min-width: 700px) {
    min-inline-size: ${({ minsize }) => (minsize ? `${minsize / 2}%` : "5%")};
  }
`;

export const Group = styled.div`
  /* ${({ boxshadow }) => (boxshadow ? "box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); padding:10px" : "")}; */
  margin: ${({ margingroup }) => (margingroup ? margingroup : "10px 0")};
  border-radius: 5px;
  border: 1px solid ${color.white};
`;

export const SubGroup = styled.div`
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  justify-content: space-between;
`;

export const NameContainer = styled.div`
  flex-grow: 1;

  > ${SubGroup}:nth-of-type(1) {
    margin-top: 10px;
  }

  > ${SubGroup} {
    justify-content: flex-start;
  }

  ${Quantity} {
    font-size: 12px;
    font-weight: normal;
    min-inline-size: 5%;
  }
`;

export const Name = styled.p`
  margin: 0;
  box-sizing: border-box;
  padding: 5px;
`;

export const Extras = styled.p`
  margin: 0;
  box-sizing: border-box;
  padding: 5px;
  font-size: 12px;
`;

export const Size = styled.p`
  margin: 0;
  box-sizing: border-box;
  padding: 3px 10px;
  font-size: 12px;
  background: ${color.whiteDarkLight};
  color: ${color.greyDark};
  font-weight: 600;
  width: fit-content;
  border-radius: 50px;
`;

export const Price = styled.p`
  margin: 10px;
  box-sizing: border-box;
  min-inline-size: 30%;
  font-size: 14px;
  text-align: end;
  @media (min-width: 700px) {
    min-inline-size: 20%;
  }
`;

export const Coupon = styled.div`
  height: 100px;
  background-color: silver;
  border-radius: 5px;
  margin: 5px;
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

export const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 10px;
`;

export const SubTitle = styled.p`
  font-size: 20px;
  margin: 10px;
  user-select: none;
  font-weight: bold;
`;

export const Text = styled.p`
  box-sizing: border-box;
  font-size: 14px;
  margin: 10px 10px;
  user-select: none;
  line-height: normal;
`;

export const SubText = styled.p`
  margin-top: 5px;
  font-size: 12px;
  margin: 0;
  user-select: none;
  line-height: normal;
`;

export const Button = styled.button`
  border-radius: 4px;
  background: ${({ primary }) => (primary ? "#4B59F7" : "#0467FB")};
  white-space: nowrap;
  padding: ${({ big }) => (big ? "12px 64px" : "10px 20px")};
  color: #fff;
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  margin: 20px auto 0 auto;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background-color: ${({ primary }) => (primary ? "#0467FB" : "#4B59F7")};
  }
  @media (min-width: 700px) {
    align-self: end;
    margin: 20px 5px 0 auto;
  }
`;

export const Input = styled.input`
  margin-right: 10px;
`;