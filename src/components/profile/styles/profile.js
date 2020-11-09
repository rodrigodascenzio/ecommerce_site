import styled from "styled-components/macro";
import { color } from "../../../utils/colors";
import { AiFillEdit } from "react-icons/ai";

export const Container = styled.div`
  background-color: ${color.whiteLight};
  padding: 10px;

  @media (min-width: 700px) {
    padding: 30px;
  }
`;

export const Title = styled.h1`
  width: 100%;
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 20px 0;
  color: #303030;
`;

export const List = styled.ul``;

export const Name = styled.p`
  color: #808080;
  text-overflow: ellipsis;
  font-size: 16px;
`;

export const Picture = styled.img`
  width: 100%;
  max-width: 150px;
  border-radius: 50%;
  height: auto;
  border: 3px solid black;
  cursor: pointer;
`;

export const Item = styled.div`
  text-align: center;
  margin: 20px;
`;

export const Card = styled.div`
  background-color: ${color.whiteLight};
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  max-width: 1000px;
  border-radius: 10px;
  margin: 10px auto;
  padding: 10px;

  @media (min-width: 700px) {
    padding: 20px;
  }
`;

export const EditIcon = styled(AiFillEdit)`
  border: 0;
  color: gray;
  position: absolute;
  right: 0;
  top: 10px;
  padding: 5px;
  border-radius: 5px;
  margin: 0 8px;
  z-index: 10;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: gray;
    color: white;
  }
  align-items: center;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  border-radius: 5px;
  padding: 20px;
  height: 100%;

  @media (min-width: 700px) {
    > ${Title} {
      margin-bottom: ${({ marginbottomtitle }) => (marginbottomtitle ? `${marginbottomtitle}px` : "50px")};
    }
  }
`;

export const Content = styled.div`
  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export const Base = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Form = styled.div`
  border: 1px solid ${color.whiteLight};
  border-radius: 5px;
  width: 100%;
  margin: auto;
`;

export const Input = styled.input`
  box-sizing: border-box;
  border: 1px solid ${color.whiteDark};
  border-radius: 4px;
  height: 50px;
  width: 100%;
  line-height: 50px;
  padding: 5px 20px;
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 20px;
  }
`;

export const Submit = styled.button`
  background: ${(props) => props.theme.background_color};
  border: 2px solid ${(props) => props.theme.primary_color};
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  margin: 50px auto 0 auto;
  padding: 16px;
  color: white;
  min-width: 30%;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
  &:hover :not([disabled]) {
    background: #fff;
    color: ${(props) => props.theme.primary_color};
  }
`;

export const Logout = styled(Submit)`
  background: white;
  border: 2px solid ${color.whiteDark};
  color: ${color.whiteDark};
  &:hover :not([disabled]) {
    background: ${color.whiteDark};
    background: ${color.whiteDark};
    color: white;
  }
`;

export const Div = styled.div`
  position: relative;
  margin: 0;
`;
